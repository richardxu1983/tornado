# coding=utf-8
from basic import BasicCtrl
import tornado.web
from tools.dbase import conn
import game.place


class openMapHandler(BasicCtrl):

    @tornado.web.authenticated
    def post(self):
        username = tornado.escape.json_decode(self.current_user)   # 获取登录名
        id = conn.hget('users:', username)
        pos_str = conn.hmget('role:pos:%s' % id, 'x', 'y')
        pos_x = int(pos_str[0])
        pos_y = int(pos_str[1])
        resp = {}
        for i in range(pos_x - 3, pos_x + 4):
            for j in range(pos_y - 3, pos_y + 4):
                pos_self = 0
                pos_user = ""
                if conn.exists('place:%s:%s' % (i, j)):
                    pos_str = conn.hmget('place:%s:%s' % (
                        pos_x, pos_y), 'belong', 'belongTo', 'type')
                    pos_belong = int(pos_str[0])
                    pos_belongTo = pos_str[1]
                    pos_type = int(pos_str[2])
                    if pos_belong == game.place.BELONG_PLAYER:
                        pos_user = conn.hmget(
                            'user:%s' % pos_belongTo,
                            'username')[0]
                        if pos_belongTo == id:
                            pos_self = 1
                    resp["%s:%s" % (i, j)] = {
                        "x": i,
                        "y": j,
                        "belong": pos_belong,
                        "belongTo": pos_user,
                        "self": pos_self,
                        "type": pos_type,
                    }

        self.write(resp)
        self.finish()
        return
        pass
