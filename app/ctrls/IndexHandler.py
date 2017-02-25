# coding=utf-8
from basic import BasicCtrl
from uuid import uuid4
import tornado.web
from game.gday import GDay
from game.role import ROLE
from tools.dbase import conn
import game.place
import time


class indexHandler(BasicCtrl):
    @tornado.web.authenticated
    def get(self):
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        login_code = tornado.escape.json_decode(self.get_current_login_code())
        session = uuid4()
        print(username)
        print(login_code)
        self.render(
            'index.html',
            page_title="hello!",
            session=session,
            date='ff20934g34hg7d')

    def post(self):
        action = self.get_argument('action')
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        id = conn.hget('users:', username)

        if action == 'signin':
            # 获取登录码
            login_code = tornado.escape.json_decode(
                self.get_current_login_code())

            print("id : %s" % id)

            if not id:
                self.write({"sta": "-1"})   # 表示无此用户
                self.finish()
                return

            if self.login_code_verify(username, login_code) is False:
                self.write({"sta": "-2"})   # 在别处登录了
                self.finish()
                return

            conn.hmset('user:%s' % id, {
                'signin': time.time(),
            })

            nickname = conn.hmget('user:%s' % id, 'nickname')[0]
            createTime = conn.hmget('role:basic:%s' % id, 'createTime')
            print("createTime:%s" % createTime)
            if createTime[0] is None:
                # 没有角色，建立一个新的角色
                ROLE.createNewRoleToDB(nickname, id)

            ROLE.roleSetFedTime(id)

            role_id = 'role:attr:%s' % id
            attr_str = conn.hmget(role_id, 'hp', 'fed',
                                  'coldResist', 'atk', 'def')
            attr_hp = attr_str[0]
            attr_fed = attr_str[1]
            attr_coldResist = attr_str[2]
            attr_atk = attr_str[3]
            attr_def = attr_str[4]
            prop_gold = conn.hmget('role:basic:%s' % id, 'gold')
            prop_gold = prop_gold[0]

            pos_str = conn.hmget('role:pos:%s' % id, 'x', 'y')
            pos_x = int(pos_str[0])
            pos_y = int(pos_str[1])
            pos_belong = game.place.BELONG_NONE
            pos_belongTo = 0
            pos_user = ""
            pos_self = 0
            pos_type = 1

            if "%s:%s" % (pos_x, pos_y) in game.place._mapJsonData:
                pos_type = game.place._mapJsonData["%s:%s" % (pos_x, pos_y)]

            if conn.exists('place:%s:%s' % (pos_x, pos_y)):
                pos_str = conn.hmget('place:%s:%s' % (
                    pos_x, pos_y), 'belong', 'belongTo', 'type')
                pos_belong = int(pos_str[0])
                pos_belongTo = pos_str[1]
                pos_type = int(pos_str[2])

            if pos_belong == game.place.BELONG_PLAYER:
                pos_user = conn.hmget('user:%s' % pos_belongTo, 'username')[0]
                if pos_belongTo == id:
                    pos_self = 1

            self.write({
                "sta": 0,
                "nickname": nickname,
                "user": username,
                "year": GDay._year,
                "season": GDay._season,
                "week": GDay._week,
                "day": GDay._day,
                "hour": GDay._hour,
                "gold": prop_gold,
                "attr": {
                    "hp": attr_hp,
                    "fed": attr_fed,
                    "atk": attr_atk,
                    "def": attr_def,
                    "coldResist": attr_coldResist,
                },
                "pos": {
                    "x": pos_x,
                    "y": pos_y,
                    "belong": pos_belong,
                    "belongTo": pos_user,
                    "self": pos_self,
                    "type": pos_type,
                }
            })   # 在别处登录了
            self.finish()
            return
        pass
