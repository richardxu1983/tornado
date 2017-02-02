#coding=utf-8
from basic import BasicCtrl
from uuid import uuid4

import random
import tornado.web

from game.gs import GS;
from game.gday import GDay
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
        if action == 'signin':
            username = tornado.escape.json_decode(self.current_user)   # 获取登录名
            login_code = tornado.escape.json_decode(self.get_current_login_code())   # 获取登录码

            id = conn.hget('users:',username)
            
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
            })   # 在别处登录了
            self.finish()
            return
        if action == 'update':
            self.write({
            "sta": 0,
            "year":GDay._year,
            "season":GDay._season,
            "week":GDay._week,
            "day":GDay._day,
            "hour":GDay._hour,
            })   # 在别处登录了
            self.finish()
        pass
