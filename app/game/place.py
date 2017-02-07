#coding=utf-8
import tools
from  tools.dbase import conn;
import json

_placeJsonFile = open('json/Place.json')
_placeJsonData = json.load(_placeJsonFile)

class map(object):

    def __init__(self):
        self.areaNum=-1,
        self.w=100
        self.h=100
        self.mapArea = [[0 for i in range(self.w)] for j in range(self.h)]
        pass

    def load(self):
        print(_placeJsonData)
        print(_placeJsonData[1])
        for i in range(0, self.w):
            for j in range(0, self.h):
                areaId=conn.hmget("map","%s:%s"%(i,j))[0]
                if not areaId:
                    id=i*self.h+j
                    #print("i=%s,j=%s,id=%s,type=%s"%(i,j,id,type(id)))
                    self.mapArea[i][j] = mapArea(id)
                else:
                    #print("areaId=%s,type=%s"%(areaId,type(areaId)))
                    self.mapArea[i][j] = mapArea(areaId)

                self.mapArea[i][j].load()
                #print(self.mapArea[i][j].id)
        pass

MAP = map()

class mapArea():
    def __init__(self,id):
        print(id)
        self.id=id
        self.x=-1
        self.y=-1
        self.placeNum=-1
        self.w=16
        self.h=16
        self.place=[[0 for i in range(self.w)] for j in range(self.h)]
        pass

    def load(self):
        #print("load mapArea:%s"%self.id)
        for i in range(0, self.w):
            for j in range(0, self.h):
                placeId=conn.hmget("mapArea","place:%s:%s"%(i,j))[0]
                if not placeId:
                    id=i*self.h+j+self.id*self.w*self.h
                    #print("i=%s,j=%s,id=%s"%(i,j,id))
                    self.place[i][j] = place(id)
                else:
                    self.place[i][j] = place(placeId)

                self.place[i][j].load()     
                #print(self.place[i][j].id)             
        pass


class place():

    def __init__(self,id):
        self.facilitySlotNum=0,
        self.id=id
        self.x=-1
        self.y=-1
        self.mapAreaId=-1
        self.type=""
        self.store=[]
        self.functions=[]
        self.facility=[]
        pass

    def load(self):
        #print("load place:%s"%self.id)
        pass

    def readFromDB(self):
        pass

    def initToDB(self,random=0):

        random.randint(2, 2)
        pass