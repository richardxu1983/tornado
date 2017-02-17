# coding=utf-8
from basic import BasicCtrl
import tools.dbase
from tools.dbase import conn
import time


class signinHandler(BasicCtrl):

    def post(self):
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

        id = conn.hget('users:', username)
        print("id : %s" % id)
        if not id:
            self.write({"sta": "-2"})   # 表示无此用户
            self.finish()
            return

        password_hash, u_salt = conn.hmget('user:%s' % id, 'u_password_hash', 'u_salt')
        u_password_hash = self.result_hash(username=username, password=hash_value, salt=u_salt)

        if u_password_hash != password_hash:
            self.write({"sta": "-5"})   # 密码不正确
            self.finish()
            return

        conn.hmset('user:%s' % id, {
            'signin': time.time(),
        })

        self.set_current_user(username)
        self.set_current_login_code(login_code)
        self.write('{"sta": 0}')
        self.finish()
        return

    def on_finish(self):
        # print("on_finish")
        pass

    def on_connection_close(self):
        # print("on_connection_close")
        pass
