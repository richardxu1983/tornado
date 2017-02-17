# coding=utf-8
from basic import BasicCtrl
import tools.dbase
from tools.dbase import acquire_lock_with_timeout
from tools.dbase import conn
import time


class signupHandler(BasicCtrl):

    def post(self):
        username = self.get_argument('name')
        nickname = self.get_argument('nick')
        passwordAdd = self.get_argument('pwd')  # 提交上来的密码，已被md5过
        u_id = self.random_number()
        u_salt = self.random_salt()
        u_password_hash = self.result_hash(username=username, password=passwordAdd, salt=u_salt)

        if not username or not passwordAdd or not nickname:
            self.write({"sta": "-3"})   # 表示账号或密码或昵称为空
            self.finish()
            return

        username = username.lower()
        nickname = nickname.lower()
        lock = acquire_lock_with_timeout(conn, 'user:' + username, 1)

        if not lock:
            self.write({"sta": "-99"})   # 表示服务器忙
            self.finish()
            return

        if conn.hget('users:', username):
            tools.dbase.release_lock(conn, 'user:' + username, lock)
            self.write({"sta": "-4"})   # 用户名已被占用
            self.finish()
            return

        if conn.hget('nicknames:', nickname):
            tools.dbase.release_lock(conn, 'user:' + username, lock)
            self.write({"sta": "-5"})   # 昵称已被占用
            self.finish()
            return

        id = conn.incr('user:id:')
        pipeline = conn.pipeline(True)
        pipeline.hset('users:', username, id)
        pipeline.hset('nicknames:', nickname, id)
        pipeline.hmset('user:%s' % id, {
            'username': username,
            'u_salt': u_salt,
            'u_id': u_id,
            'u_password_hash': u_password_hash,
            'nickname': nickname,
            'signup': time.time(),
        })
        pipeline.execute()
        tools.dbase.release_lock(conn, 'user:' + username, lock)
        self.write({"sta": "0"})   # 完成注册
        self.finish()
        return

    def on_finish(self):
        # print("on_finish")
        pass

    def on_connection_close(self):
        # print("on_connection_close")
        pass
