#coding=utf-8
from  tools.dbase import conn;
import json
import os

class gameDay():

    def __init__(self):
        self._jsonData = None
        self._year = 0
        self._day = 0
        self._week = 0
        self._hour = 0
        self._sec = 0
        self._secsInHour = 0
        self._hoursInDay = 0
        self._DaysInWeek = 0
        self._WeekInSeason = 0
        self._SeasonInYear = 0
        self._season = 1
        self._SeasonTxt = []
        self._Temp = 0

    def init(self):
        json_file=open('json/Day.json')
        self._jsonData = json.load(json_file)
        print(self._jsonData)
        self._secsInHour = self._jsonData["secsInHour"]
        self._hoursInDay = self._jsonData["hoursInDay"]
        self._DaysInWeek = self._jsonData["DaysInWeek"]
        self._WeekInSeason = self._jsonData["WeekInSeason"]
        self._SeasonInYear = self._jsonData["SeasonInYear"]

        for x in xrange(0,4):
            self._SeasonTxt.insert(x,int(self._jsonData["SeasonTxt"][x]))
        pass

    def dayUpdate(self):
        
        if self._hour>=self._hoursInDay:
            self._hour = int(self._jsonData["hourInit"])
            self._day += 1
            conn.set('game:day',self._day)
            conn.set('game:hour',self._hour)

        if self._day > self._DaysInWeek:
            self._day = int(self._jsonData["dayInit"])
            self._week+=1
            conn.set('game:day',self._day)
            conn.set('game:week',self._week)

        if self._week >= self._WeekInSeason:
            self._week = int(self._jsonData["WeekInit"])
            self._season+=1
            conn.set('game:week',self._week)

        if self._season > self._SeasonInYear+1:
            self._season = 1
            self._year+=1
            conn.set('game:year',self._year)

        print("year:%s,season:%s,week:%s,day:%s,hour:%s"%(self._year,self._season,self._week,self._day,self._hour))

    def readDB(self):
        #year day
        self._year = conn.get('game:year')
        if self._year==None:
            self._year = int(self._jsonData["yearInit"])
            conn.set('game:year',self._year)
        else:
            self._year = int(self._year)

        #get day
        self._day = conn.get('game:day')
        if self._day==None:
            self._day = int(self._jsonData["dayInit"])
            conn.set('game:day',self._day)
        else:
            self._day = int(self._day)

        #get hour
        self._hour = conn.get('game:hour')
        if self._hour==None:
            self._hour = int(self._jsonData["hourInit"])
            conn.set('game:hour',self._hour)
        else:
            self._hour = int(self._hour)

        #get week
        self._week = conn.get('game:week')
        if self._week==None:
            self._week = int(self._jsonData["WeekInit"])
            conn.set('game:week',self._week)
        else:
            self._week = int(self._week)

        self.dayUpdate()

    def update(self):
        self._sec += 1
        if self._sec>=self._secsInHour:
            self._sec = 0
            self._hour+=1
            conn.set('game:hour',self._hour)
            self.dayUpdate()

GDay = gameDay();