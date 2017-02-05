#coding=utf-8
from basic import BasicCtrl
from uuid import uuid4

import random
import tornado.web

from game.gs import GS;
from game.gday import GDay
from game.role import ROLE
from  tools.dbase import conn;
import time;

class indexHandler(BasicCtrl):
    @tornado.web.authenticated
    def get(self):
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        login_code = tornado.escape.json_decode(self.get_current_login_code())   # 获取登录码
        session = uuid4()
        print(username)
        print(login_code)
        self.render('index.html', page_title="hello!", session=session, date='ff20934g34hg7d')

    def post(self):
        action = self.get_argument('action')
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        id = conn.hget('users:',username)

        if action == 'signin':
            login_code = tornado.escape.json_decode(self.get_current_login_code())   # 获取登录码

            print("id : %s" % id)

            if not id:
                self.write({"sta": "-1"})   # 表示无此用户
                self.finish()
                return

            if self.login_code_verify(username, login_code)==False:
                self.write({"sta": "-2"})   # 在别处登录了
                self.finish()
                return

            conn.hmset('user:%s'%id,{
                'signin':time.time(),
                })


            nickname = conn.hmget('user:%s'%id,'nickname')
            nickname = nickname[0]
            createTime = conn.hmget('role:basic:%s'%id,'createTime')
            print("createTime:%s"%createTime)
            if createTime[0] is None:
                #没有角色，建立一个新的角色
                ROLE.createNewRoleToDB(nickname,id)

            ROLE.roleSetFedTime(id)
            
            role_id = 'role:attr:%s'%id
            attr_str = conn.hmget(role_id,'hp','fed','coldResist','atk','def')
            attr_hp=attr_str[0]
            attr_fed=attr_str[1]
            attr_coldResist=attr_str[2]
            attr_atk=attr_str[3]
            attr_def=attr_str[4]
            prop_gold=conn.hmget('role:basic:%s'%id,'gold')
            prop_gold=prop_gold[0]

            #print(time.asctime( time.localtime(float(conn.hmget('user:%s'%id,'signin')[0]))))
            self.write({
            "sta": 0,
            "nickname":nickname,
            "user":username,
            "year":GDay._year,
            "season":GDay._season,
            "week":GDay._week,
            "day":GDay._day,
            "hour":GDay._hour,
            "gold":prop_gold,
            "attr":{
                "hp":attr_hp,
                "fed":attr_fed,
                "coldResist":attr_coldResist,
                "atk":attr_atk,
                "def":attr_def,
            }
            })   # 在别处登录了
            self.finish()
            return

        if action == 'update':

            fed=conn.hmget('role:attr:%s'%id,'fed')
            ROLE.roleFedUpdate(id)

            self.write({
            "sta": 0,
            "year":GDay._year,
            "season":GDay._season,
            "week":GDay._week,
            "day":GDay._day,
            "hour":GDay._hour,
            "attr":{
                "fed":fed,
            }
            })   # 在别处登录了
            self.finish()
        if action == 'resetAttr':
            ROLE.resetAttr(id)
            attr_str = conn.hmget('role:attr:%s'%id,'hp','fed','coldResist','atk','def')
            attr_hp=attr_str[0]
            attr_fed=attr_str[1]
            attr_coldResist=attr_str[2]
            attr_atk=attr_str[3]
            attr_def=attr_str[4]
            self.write({
            "sta": 0,
            "attr":{
                "hp":attr_hp,
                "fed":attr_fed,
                "coldResist":attr_coldResist,
                "atk":attr_atk,
                "def":attr_def,
            }
            })
            self.finish()
            return
        pass
