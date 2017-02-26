# coding=utf-8
from basic import BasicCtrl
import tornado.web
from game.gday import GDay
from game.role import ROLE
from tools.dbase import conn


class updateHandler(BasicCtrl):

    @tornado.web.authenticated
    def post(self):
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        id = conn.hget('users:', username)
        fed = conn.hmget('role:attr:%s' % id, 'fed')
        status = conn.hmget('role:status:%s' % id, 'status')
        ROLE.roleFedUpdate(id)
        self.write({
            "sta": 0,
            "year": GDay._year,
            "season": GDay._season,
            "week": GDay._week,
            "day": GDay._day,
            "hour": GDay._hour,
            "status": status,
            "attr": {
                "fed": fed,
            }
        })
        self.finish()
        pass
