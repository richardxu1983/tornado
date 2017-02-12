#coding=utf-8
import tools
from  tools.dbase import conn;
import json
import random
import jsonData

_placeJsonFile = open('json/Place.json')
_placeJsonData = json.load(_placeJsonFile)

'''
print(_placeJsonData)
print("\n=====================================\n")
print(_placeJsonData[1])
print("\n=====================================\n")
print(type(_placeJsonData[1]["data"]["function"]))
print(type(_placeJsonData[1]["data"]["function"]))
for v in _placeJsonData[1]["data"]["function"]:
    print v["type"]
'''


AreaW = 9
AreaH = 9
PlayerGap=2
RandomGap=PlayerGap*2+1

BELONG_NONE = 0
BELONG_NPC = 1
BELONG_PLAYER = 999

class map(object):

    def __init__(self):
        self.areaNum=-1,
        self.w=72
        self.h=72
        self.wNum=self.w*AreaW
        self.hNum=self.h*AreaH
        self.place = [[0 for i in range(self.wNum)] for j in range(self.hNum)]
        pass

    def load(self):
        print("start loading map...")
        #获取搜索阶段
        phase = conn.get('map:searchPhase')
        if not phase:
            conn.set('map:searchPhase',1)

        #获取搜索半径
        seg = conn.get('map:searchSeg')
        if not seg:
            conn.set('map:searchSeg',1)

        #获取搜索位置
        index = conn.get('map:searchIndex')
        if not seg:
            conn.set('map:searchIndex',0)

        for i in range(0, self.wNum):
            for j in range(0, self.hNum):
                AreaX=i/AreaW
                AreaY=j/AreaH
                AreaId="%s:%s"%(AreaX,AreaY)
                #print("i=%s,j=%s,id=%s,type=%s"%(i,j,id,type(id)))
                self.place[i][j] = place(i,j,AreaId,AreaX,AreaY)
                self.place[i][j].load()
                #print(self.mapArea[i][j].id)
        print("map loaded")

    #检测是否可以放置玩家
    def canPutPlayer(self,x,y):

        belong = 0
        for i in range(x-PlayerGap, x+PlayerGap+1):
            for j in range(y-PlayerGap, y+PlayerGap+1):
                if i<=0 or j<=0 or i>=self.wNum-1 or j>=self.hNum-1:
                    return False
                print("x:%s,y:%s,i:%s,j:%s,belong=%s"%(x,y,i,j,belong))
                belong = int(conn.hmget('place:%s:%s'%(i,j),'belong')[0])
                
                if belong!= BELONG_NONE:
                    return False
        return True

    def setHomeForPlayer(self,uid,x,y):

        slotNum = int(_placeJsonData[0]["data"]["FacilitySlot"])
        placeid='place:%s:%s'%(x,y)
        slotIndex = 0
        funNum=0
        pipeline = conn.pipeline(True)
        pipeline.hmset(
            placeid,{
            'belong':BELONG_PLAYER,
            'belongTo':uid,
            'type':0,
            'slotNum':slotNum,
            'slotIndex':slotIndex,
            'funNum':funNum,
            })

        #slot
        if slotNum>0:
            for i in range(1,slotNum+1):
                pipeline.hmset(placeid,{'slot:%s'%i:0,})

        #Facilities
        for v in _placeJsonData[0]["data"]["initFacilities"]:
            slotIndex+=1
            pipeline.hmset(placeid,{
                'slot:%s:type'%slotIndex:v["type"],
                'slot:%s:id'%slotIndex:v["id"],
                'slotIndex':slotIndex,
                })

        #function
        for v in _placeJsonData[0]["data"]["function"]:
            funNum+=1
            pipeline.hmset(placeid,{'funNum':funNum,
                'fun:%s:type'%funNum:v["type"],
                })
            if v.has_key("id"):
                pipeline.hmset(placeid,{
                'fun:%s:id'%funNum:v["id"],
                })
            if v["type"]=="store":
                id=v["id"]
                room = int(jsonData._store[id]["room"])
                print("room:%s"%room)
                pipeline.hmset(
                'store:%s:%s'%(x,y),{
                'room':room,
                })
                for i in range(1,room+1):
                    pipeline.hmset(
                    'store:%s:%s'%(x,y),{
                    'room:%s'%i:0,
                    })
        pipeline.execute()
        pass

    def findHome(self,uid):
        return self.findAPlaceFor(uid,300,300,3)

    def findAPlaceFor(self,uid,x,y,radius):

        phase = int(conn.get('map:searchPhase'))
        seg = int(conn.get('map:searchSeg'))
        index = int(conn.get('map:searchIndex'))

        print("findAPlaceFor uid=%s,x=%s,y=%s"%(uid,x,y))

        while True:
            print("phase=%s"%(phase))
            if phase==1:
                for i in range(x-RandomGap*seg+index,x+radius+RandomGap*(seg-1)+1):
                    py=random.randint(y+1+RandomGap*(seg-1), y+RandomGap*seg)
                    print("i=%s,py=%s"%(i,py))
                    if self.canPutPlayer(i,py):
                        self.setHomeForPlayer(uid,i,py)
                        conn.set('map:searchIndex',i)
                        return i,py
                phase+=1
                conn.set('map:searchPhase',phase)  
            
            if phase==2:
                for py in range(y-radius+RandomGap*(seg-1)+index,y+RandomGap*seg):
                    px=random.randint(x+radius+1+RandomGap*(seg-1),x+radius+RandomGap*seg)
                    if self.canPutPlayer(px,py):
                        self.setHomeForPlayer(uid,px,py)
                        conn.set('map:searchIndex',py)
                        return px,py
                phase+=1
                conn.set('map:searchPhase',phase)  

            if phase==3:
                for px in range(x-RandomGap*(seg-1)+index,x+radius+RandomGap*seg):
                    py=random.randint(y-radius-1-RandomGap*(seg-1),y-radius-RandomGap*seg)
                    if self.canPutPlayer(px,py):
                        self.setHomeForPlayer(uid,px,py)
                        conn.set('map:searchIndex',px)
                        return px,py
                phase+=1
                conn.set('map:searchPhase',phase)  


            if phase==4:
                for py in range(y-radius-RandomGap*seg+index,y+RandomGap*(seg-1)):
                    px=random.randint(x-RandomGap*seg,x-1-RandomGap*(seg-1))
                    if self.canPutPlayer(px,py):
                        self.setHomeForPlayer(uid,px,py)
                        conn.set('map:searchIndex',py)
                        return px,py
                phase=1
                conn.set('map:searchPhase',phase)
                seg+=1
                conn.set('map:searchSeg',seg)

        return 0,0

MAP = map()

class place():

    def __init__(self,x,y,AreaId,AreaX,AreaY):
        self.facilitySlotNum=0,
        self.x=x
        self.y=y
        self.areaId=AreaId
        self.areaX = AreaX
        self.areaY = AreaY
        self.type=""
        self.store=[]
        self.functions=[]
        self.facility=[]
        #print("place : AreaX=%s , AreaY = %s , x=%s , y=%s"%(AreaX,AreaY,self.x,self.y))
        pass

    def load(self):
        self.type = conn.hmget('place:%s:%s'%(self.x,self.y),"type")[0]
        if not self.type:
            self.initToDB(1)
        #print("load place:%s"%self.id)
        pass

    def readFromDB(self):
        pass

    def initToDB(self,randomP=1):
        if randomP==1:

            pipeline = conn.pipeline(True)
            r = random.randint(1, 1)
            self.type = r
            funNum=0
            placeid='place:%s:%s'%(self.x,self.y)

            pipeline.hmset(
            placeid,{
            'type':self.type,
            'pos':"%s,%s"%(self.x,self.y),
            'areaX':self.areaX,
            'areaY':self.areaY,
            'areaId':self.areaId,
            'belong':BELONG_NONE,
            'belongTo':0,
            })
            for v in _placeJsonData[self.type]["data"]["function"]:
                funNum+=1
                pipeline.hmset(placeid,{
                    'funNum':funNum,
                    'fun:%s:type'%funNum:v["type"],
                    })
                if v.has_key("id"):
                    pipeline.hmset(placeid,{
                        'fun:%s:id'%funNum:v["id"],
                        })
                if v["type"]=="store":
                    id=v["id"]
                    room = int(jsonData._store[id]["room"])
                    print("room:%s"%room)
                    pipeline.hmset(
                    'store:%s:%s'%(x,y),{
                    'room':room,
                    })
                    for i in range(1,room+1):
                        pipeline.hmset(
                        'store:%s:%s'%(x,y),{
                        'room:%s'%i:0,
                        })           
            pipeline.execute()
        #random.randint(2, 2)
        pass