#coding=utf-8
import tools
from  tools.dbase import conn;


_placeJsonData = open('json/Place.json')

class place():

    def __init__(self):
        self.facilitySlotNum=0,
        self.id=-1,
        self.x=-1,
        self.y=-1,
        self.mapAreaId=-1,
        self.type="",
        pass

    def readFromDB(self):
        pass

    def initToDB(self):
        pass