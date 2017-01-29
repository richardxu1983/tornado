# coding=utf-8
# encoding=utf-8

import os.path
import tornado
import random
import hashlib
import string
import time
import binascii
import tools.dbase

class BasicCtrl(tornado.web.RequestHandler):
        def set_default_headers(self):
            self.set_header('server', self.settings['servs'])
            self.set_header('x-frame-options', 'SAMEORIGIN')
            self.set_header('x-xss-protection', '1; mode=block')
            self.set_header('cache-control', 'no-transform')
            print self.settings['servs']

        def asset(self, name, host="/", base="www", path="assets", vers=True):
            addr = os.path.join(path, name)

            if vers:
                if isinstance(vers, bool):
                    vers = tornado.web.StaticFileHandler.get_version({'static_path': ''}, os.path.join(self.settings['root_path'], base, addr))
                    print "vers:%s" % vers

                if vers:
                    print "asset : %s?%s" % (os.path.join(host, addr), vers)
                    return "%s?%s" % (os.path.join(host, addr), vers)

            return os.path.join(host, addr)

        def flash(self, isok, resp={}, _ext=''):
            if isok:
                resp['err'] = 0
            else:
                resp['err'] = 1

            if 'sta' in resp and resp['sta']:
                self.set_status(resp['sta'])
            else:
                resp['sta'] = self.get_status()

            if 'msg' not in resp:
                resp['msg'] = self._reason
            if 'url' not in resp:
                resp['url'] = ''
            if 'dat' not in resp:
                resp['dat'] = {}

            if _ext == '.json' or (('Accept' in self.request.headers) and (self.request.headers['Accept'].find('json') >= 0)):
                self.write(self.get_escaper().json_encode(resp))
            else:
                self.render('flash.html', resp=resp)

        def get_escaper(self):
            return tornado.escape

        # 生成当前操作的系统时间
        def time_operate(self):
            return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))

        # 生成18位随机数
        def random_number(self):
            return random.randint(100000000000000000, 999999999999999999)

        # 产生32位的salt值
        def random_salt(self):
            return binascii.b2a_hex(os.urandom(16))

        # 产生存入数据库的密码hash值
        def result_hash(self, username, password, salt):
            hash_value = hashlib.md5(username + password).hexdigest().decode()
            return hashlib.md5(salt + hash_value).hexdigest()

        # 设置当前登录用户
        def set_current_user(self, user):
            if user:
                self.set_secure_cookie("user", tornado.escape.json_encode(user), expires_days = 7)
            else:
                self.clear_cookie("user")

        # 设置登录码login_code
        def set_current_login_code(self, login_code):
            if login_code:
                self.set_secure_cookie("login_code", tornado.escape.json_encode(login_code), expires_days = 7)
            else:
                self.clear_cookie("login_code")

        # 比较login_code是否一致
        def login_code_verify(self, username, login_code):
            if tools.dbase.get_login_code(username) == login_code:
                return True
            else:
                self.clear_cookie("user")
                self.clear_cookie("login_code")
                return False

        # 获取用户名cookie
        def get_current_user(self):
            return self.get_secure_cookie("user")


        # 获取登录码login_code
        def get_current_login_code(self):
            return self.get_secure_cookie("login_code")