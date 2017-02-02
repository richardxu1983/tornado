#coding=utf-8
from basic import BasicCtrl
from uuid import uuid4

import random

from  game.gs import GS;

import tools.dbase
from tools.dbase import acquire_lock_with_timeout
from tools.dbase import conn
import time
import hashlib

class LoginHandler(BasicCtrl):
    def get(self):

        self.clear_cookie("user")
        self.clear_cookie("login_code")
        session = uuid4()
        self.render('login.html', page_title="welcome!", session=session, date='ff20934g34hg7d')

    def post(self):
        action = self.get_argument('action')

        '''
        if action == 'text':
            text='back:'+str(random.randint(10, 20))
            self.write('{"data":"%s"}' % GS.day())
            #self.write('recv post2')
        '''
        if action == 'signin':

            username = self.get_arguments("name")  # 获取登录表单信息中的用户名
            hash_value = self.get_arguments("pwd")  # 获取登录表单的hash_value

            if not username or not hash_value:
                self.write({"sta": "-3"})   # 表示账号或密码为空
                self.finish()
                return
            username = username[0]
            hash_value = hash_value[0]
            username = username.lower()
            tools.dbase.set_login_code(username)  # 用户登录时设置login_code
            login_code = tools.dbase.get_login_code(username)  # 获取用户登录随即设置的login_code

            id = conn.hget('users:',username)
            print("id : %s" % id)
            if not id:
                self.write({"sta": "-2"})   # 表示无此用户
                self.finish()
                return

            password_hash,u_salt  = conn.hmget('user:%s'%id,'u_password_hash','u_salt')
            u_password_hash = self.result_hash(username=username, password=hash_value, salt=u_salt)

            if u_password_hash!=password_hash:
                self.write({"sta": "-5"})   # 密码不正确
                self.finish()
                return 

            conn.hmset('user:%s'%id,{
                'signin':time.time(),
                })

            self.set_current_user(username)
            self.set_current_login_code(login_code)
            self.write('{"sta": 0}')
            self.finish()
            return

        if action == 'signup': #注册用户

            username = self.get_argument('name')
            nickname = self.get_argument('nick')
            passwordAdd = self.get_argument('pwd') #提交上来的密码，已被md5过
            u_id = self.random_number()
            u_salt = self.random_salt()
            u_password_hash = self.result_hash(username=username, password=passwordAdd, salt=u_salt)

            if not username or not passwordAdd or not nickname:
                self.write({"sta": "-3"})   # 表示账号或密码或昵称为空
                self.finish()
                return

            username = username.lower()
            nickname = nickname.lower()
            lock = acquire_lock_with_timeout(conn, 'user:'+username,1)

            if not lock:
                self.write({"sta": "-99"})   # 表示服务器忙
                self.finish()
                return

            if conn.hget('users:',username):
                tools.dbase.release_lock(conn,'user:'+username, lock)
                self.write({"sta": "-4"})   # 用户名已被占用
                self.finish()
                return

            if conn.hget('nicknames:',nickname):
                tools.dbase.release_lock(conn,'user:'+username, lock)
                self.write({"sta": "-5"})   # 昵称已被占用
                self.finish()
                return

            id = conn.incr('user:id:')
            pipeline = conn.pipeline(True)
            pipeline.hset('users:',username,id)
            pipeline.hset('nicknames:',nickname,id)
            pipeline.hmset('user:%s'%id,{
                'username':username,
                'u_salt':u_salt,
                'u_id':u_id,
                'u_password_hash':u_password_hash,
                'nickname':nickname,
                'signup':time.time(),
                })
            pipeline.execute()
            tools.dbase.release_lock(conn,'user:'+username, lock)
            self.write({"sta": "0"})   # 完成注册
            self.finish()
            return


    def on_finish(self):
        #print("on_finish")
        pass

    def on_connection_close(self):
        #print("on_connection_close")
        pass

class LogOutHandler(BasicCtrl):
    def get(self, *args, **kwargs):
        self.clear_all_cookies()
        self.redirect("/")