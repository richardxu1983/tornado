#
import tools
from  tools.dbase import conn;
from tools.dbase import acquire_lock_with_timeout
import json
import os
import time
import datetime


class gamerole():
    def __init__(self):
        self._jsonData = None
        self.initGold=0
        self.initHP = 0
        self.initFed = 0
        self.initFed = 0
        self.initColdResist=0
        self.initAtk=0
        self.initDef=0
        self.equipSlot=0
        self.weaponSlot=0
        pass

    def init(self):
        json_file=open('json/Role.json')
        self._jsonData = json.load(json_file)
        self.initHP = self._jsonData["HP"],
        self.initFed = self._jsonData["fed"],
        self.initColdResist=self._jsonData["coldResist"],
        self.initAtk=self._jsonData["atk"],
        self.initDef=self._jsonData["defence"],
        self.equipSlot=self._jsonData["equipSlot"],
        self.weaponSlot=self._jsonData["weaponSlot"],
        self.initGold=self._jsonData["gold"],
        self.fedData = self._jsonData["fedData"],

    def roleAttrGet(self,id,key):
        attr = conn.hmget('role:attr:%s'%id,key)
        return attr[0]

    def roleAttrSet(self,id,key,value):
        conn.hmset('role:attr:%s'%id,key,value)

    def roleGold(self,id):
        gold = conn.hmget('role:basic:%s'%id,'gold')
        return gold[0]

    def roleGoldSet(self,id,value):
        conn.hmset('role:basic:%s'%id,'gold',value)

    def roleFedUpdate(self,id):
        tick = conn.get('role:fed_tick:%s'%id)
        tick = datetime.datetime.strptime(tick,'%Y-%m-%d %H:%M:%S.%f')
        tick_now = datetime.datetime.now()
        sec = (tick_now - tick).seconds
        sec_single=self.fedData[0]["sec"]
        if sec>=sec_single:
            conn.set('role:fed_tick:%s'%id,tick_now)
            fed_toreduce=sec/sec_single
            fed=conn.hmget('role:attr:%s'%id,'fed')
            fed=int(fed[0])
            fed-=fed_toreduce
            if fed<=0:
                fed=0
            conn.hmset('role:attr:%s'%id,{'fed':fed})
    
    def roleSetFedTime(self,id):
        tick = conn.get('role:fed_tick:%s'%id)
        tick = datetime.datetime.strptime(tick,'%Y-%m-%d %H:%M:%S.%f')
        tick_now = datetime.datetime.now()
        sec = (tick_now - tick).seconds
        sec_single=self.fedData[0]["sec"]
        if sec>=sec_single*1 and sec<sec_single*2:
            fed=conn.hmget('role:attr:%s'%id,'fed')
            fed=int(fed[0])
            fed-=1
            if fed<=0:
                fed=0
            conn.hmset('role:attr:%s'%id,{'fed':fed})
            conn.set('role:fed_tick:%s'%id,tick_now)
        if sec>=sec_single*2:
            conn.set('role:fed_tick:%s'%id,datetime.datetime.now())

    def resetAttr(self,id):
        conn.hmset(
            'role:attr:%s'%id,{
            'hp':self.initHP,
            'fed':self.initFed,
            'coldResist':self.initColdResist,
            'atk':self.initAtk,
            'def':self.initDef,
            })
        

    def createNewRoleToDB(self,nickname,id):
        t = time.time()
        lock = acquire_lock_with_timeout(conn, 'nickname:'+nickname,1)
        pipeline = conn.pipeline(True)
        conn.set('role:fed_tick:%s'%id,datetime.datetime.now())
        pipeline.hmset(
            'role:basic:%s'%id,{
            'nickname':nickname,
            'gold':self.initGold,
            'createTime':t,
            })
        pipeline.hmset(
            'role:pos:%s'%id,{
            'mapArea:x':1,
            'mapArea:y':1,
            'block:x':1,
            'block:y':1,
            })
        pipeline.hmset(
            'role:status:%s'%id,{
            'status':0,
            'atFunction':"viewFacilities",
            })
        #print("set!!!self.initHP=%s,type=%s,self.initHP[0]=%s"%(self.initHP,type(self.initHP),self.initHP[0]))
        pipeline.hmset(
            'role:attr:%s'%id,{
            'hp':self.initHP,
            'fed':self.initFed,
            'coldResist':self.initColdResist,
            'atk':self.initAtk,
            'def':self.initDef,
            })
        pipeline.hmset(
            'role:equip:%s'%id,{
            '1':0,
            '2':0,
            '3':0,
            '4':0,
            '5':0,
            '6':0,
            })
        pipeline.hmset(
            'role:weapon:%s'%id,{
            '1':0,
            '2':0,
            })
        pipeline.hmset(
            'role:bag:%s'%id,{
            '1':0,
            '2':0,
            '3':0,
            '4':0,
            '5':0,
            '6':0,
            '7':0,
            '8':0,
            '9':0,
            '10':0,
            '11':0,
            '12':0,
            '13':0,
            '14':0,
            '15':0,
            '16':0,
            })
        pipeline.execute()
        tools.dbase.release_lock(conn,'nickname:'+nickname, lock)

ROLE = gamerole();