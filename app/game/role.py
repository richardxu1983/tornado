#
from  tools.dbase import conn;
import tornado


class gamerole():
    def __init__(self):
        self._jsonData = None
        self.initHP = 0,
        self.initFed = 0,
        self.initFed = 0,
        self.initColdResist=0,
        self.initAtk=0,
        self.initDef=0,
        self.equipSlot=0,
        self.weaponSlot=0,
        pass

    def init(self):
        json_file=open('json/Role.json')
        self._jsonData = json.load(json_file)
        self.initHP = self._jsonData["HP"],
        self.initFed = self._jsonData["fed"],
        self.initColdResist=self._jsonData["coldResist"],
        self.initAtk=self._jsonData["atk"],
        self.initDef=self._jsonData["def"],
        self.equipSlot=self._jsonData["equipSlot"],
        self.weaponSlot=self._jsonData["weaponSlot"],

    def createNewRoleToDB(self,nickname,id):
        t = time.time()
        lock = acquire_lock_with_timeout(conn, 'nickname:'+nickname,1)
        pipeline = conn.pipeline(True)
        pipeline.hmset(
            'role:basic:%s'%id,{
            'nickname':nickname,
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