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
        self.render('main.html', page_title="hello!")

#
if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[(r"/", IndexHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "tamplate"),
        static_path=os.path.join(os.path.dirname(__file__), "static")
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()