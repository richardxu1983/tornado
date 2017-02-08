#coding=utf-8
import tools
from  tools.dbase import conn;
import json
import random

_placeJsonFile = open('json/Place.json')
_placeJsonData = json.load(_placeJsonFile)

print(_placeJsonData)
print("\n=====================================\n")
print(_placeJsonData[1])
print("\n=====================================\n")
print(_placeJsonData[1]["type"])

AreaW = 9
AreaH = 9
PlayerGap=2

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
        for i in range(0, self.wNum):
            for j in range(0, self.hNum):
                AreaX=i/AreaW
                AreaY=j/AreaH
                AreaId="%s:%s"%(AreaX,AreaY)
                placeId=i*self.h*AreaH+j
                #print("i=%s,j=%s,id=%s,type=%s"%(i,j,id,type(id)))
                self.place[i][j] = place(placeId,i,j,AreaId,AreaX,AreaY)
                #self.place[i][j].load()
                #print(self.mapArea[i][j].id)
        print("map loaded")
        pass

    def findAPlaceFor(self,uid,radius=3):
        x = 300+radius+PlayerGap
        y = 300
        id=self.place[x][y].id
        conn.hmset(
            'place:%s'%id,{
            'type':0,
            'belong':999,
            'belongTo':uid,
            })
        return x,y,id

MAP = map()

class place():

    def __init__(self,id,x,y,AreaId,AreaX,AreaY):
        self.facilitySlotNum=0,
        self.id=id
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
        self.type = conn.hmget('place:%s'%self.id,"type")[0]
        if not self.type:
            self.initToDB(1)
        #print("load place:%s"%self.id)
        pass

    def readFromDB(self):
        pass

    def initToDB(self,randomP=1):
        if randomP==1:
            r = random.randint(1, 1)
            self.type = r
            lock = acquire_lock_with_timeout(conn, 'place:'+self.id,1)
            pipeline = conn.pipeline(True)

            pipeline.hmset(
            'place:%s'%self.id,{
            'type':self.type,
            'pos':"%s,%s"%(self.x,self.y),
            'areaX':self.areaX,
            'areaY':self.areaY,
            'areaId':self.areaId,
            'belong':0,
            })

            pipeline.execute()
            tools.dbase.release_lock(conn,'place:'+self.id, lock)
        #random.randint(2, 2)
        pass