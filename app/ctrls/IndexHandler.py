#coding=utf-8
from basic import BasicCtrl
from uuid import uuid4

import random
import tornado.web

from  game.gs import GS;
from  tools.dbase import conn;

class indexHandler(BasicCtrl):
    @tornado.web.authenticated
    def get(self):
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        login_code = tornado.escape.json_decode(self.get_current_login_code())   # 获取登录码
        session = uuid4()
        salt = conn.get('salt')
        print(username)
        print(login_code)
        self.render('index.html', page_title="hello!", session=session, date=salt)

    def post(self):
        pass

