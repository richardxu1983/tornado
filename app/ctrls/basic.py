
import os.path
import tornado


class BasicCtrl(tornado.web.RequestHandler):
        def set_default_headers(self):
            self.set_header('server', self.settings['servs'])
            self.set_header('x-frame-options', 'SAMEORIGIN')
            self.set_header('x-xss-protection', '1; mode=block')
            self.set_header('cache-control', 'no-transform')
            print self.settings['servs']

        def asset(self, name, host="/", base="www", path="assets", vers=True):
            addr = os.path.join(path, name)

            if vers:
                if isinstance(vers, bool):
                    vers = tornado.web.StaticFileHandler.get_version({'static_path': ''}, os.path.join(self.settings['root_path'], base, addr))
                    print "vers:%s" % vers

                if vers:
                    print "asset : %s?%s" % (os.path.join(host, addr), vers)
                    return "%s?%s" % (os.path.join(host, addr), vers)

            return os.path.join(host, addr)

        def flash(self, isok, resp={}, _ext=''):
            if isok:
                resp['err'] = 0
            else:
                resp['err'] = 1

            if 'sta' in resp and resp['sta']:
                self.set_status(resp['sta'])
            else:
                resp['sta'] = self.get_status()

            if 'msg' not in resp:
                resp['msg'] = self._reason
            if 'url' not in resp:
                resp['url'] = ''
            if 'dat' not in resp:
                resp['dat'] = {}

            if _ext == '.json' or (('Accept' in self.request.headers) and (self.request.headers['Accept'].find('json') >= 0)):
                self.write(self.get_escaper().json_encode(resp))
            else:
                self.render('flash.html', resp=resp)

        def get_escaper(self):
            return tornado.escape
