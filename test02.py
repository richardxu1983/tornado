# test02, test for ajax, tornado
import os.path

import tornado.ioloop
import tornado.httpserver
import tornado.options
import tornado.web
import tornado.httpclient

from tornado.options import define, options
define("port", default=8000, help="run on given port", type=int)

# index handler
class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html', page_title="hello!")


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", IndexHandler),
        ]
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "tamplate"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            debug=True,
        )
        tornado.web.Application.__init__(self, handlers, **settings)

#
if __name__ == '__main__':
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()