# coding=utf-8
from basic import BasicCtrl
import tornado.web
from game.role import ROLE
from tools.dbase import conn


class debugHandler(BasicCtrl):

    @tornado.web.authenticated
    def post(self):
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        id = conn.hget('users:', username)
        action = self.get_argument('action')
        if action == 'resetAttr':
            ROLE.resetAttr(id)
            attr_str = conn.hmget('role:attr:%s' % id, 'hp', 'fed', 'coldResist', 'atk', 'def')
            attr_hp = attr_str[0]
            attr_fed = attr_str[1]
            attr_coldResist = attr_str[2]
            attr_atk = attr_str[3]
            attr_def = attr_str[4]
            self.write({
                "sta": 0,
                "attr": {
                    "hp": attr_hp,
                    "fed": attr_fed,
                    "atk": attr_atk,
                    "def": attr_def,
                    "coldResist": attr_coldResist,
                }
            })
            self.finish()
            return
        pass
