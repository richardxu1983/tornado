# coding=utf-8
from game.gs import GS
import os.path
import tornado.web
import tornado.ioloop
from tornado.options import define, options
from app.url import url
from app.etc import etc
import time

# 如果要在运行时设置编码,那么必须先reload
import sys
reload(sys)

# 设置编码
sys.setdefaultencoding('utf-8')

# 目录设置到上一层
sys.path[0] = os.path.dirname(sys.path[0])
sys.path.insert(1, os.path.join(sys.path[0], 'lib'))
svr = tornado.web.Application(handlers=url, **etc)

define("port", default=8000, help="run on the given port", type=int)


def foo():
    if GS.bGSon:
        GS.update()
        tornado.ioloop.IOLoop.instance().add_timeout(time.time() + 1, foo)


def main():

    options.parse_command_line()
    GS.start()

    print("Starting tornado web server on http://127.0.0.1:%s" % options.port)
    print("Quit the server with CONTROL-C")
    svr.listen(options.port, xheaders=True)
    tornado.ioloop.IOLoop.instance().add_timeout(time.time() + 1, foo)
    tornado.ioloop.IOLoop.current().start()
    print("after ioloop.start")


if __name__ == "__main__":
    main()
