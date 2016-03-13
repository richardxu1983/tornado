#coding=utf-8

#如果要在运行时设置编码,那么必须先reload
import sys
reload(sys)

import os.path

#设置编码
sys.setdefaultencoding('utf-8')

#目录设置到上一层
sys.path[0] = os.path.dirname(sys.path[0])
sys.path.insert(1, os.path.join(sys.path[0], 'lib'))

import tornado.web
import tornado.ioloop

from tornado.options import define, options

#在文件所在目录建空的__ini__
from app.url import url
from app.etc import etc

svr = tornado.web.Application(handlers=url, **etc)

define("port", default=8000, help="run on the given port", type=int)

def main():
    options.parse_command_line()
    print("Starting tornado web server on http://127.0.0.1:%s" % options.port)
    print("Quit the server with CONTROL-C")
    svr.listen(options.port, xheaders=True)
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    main()


