from basic import BasicCtrl
from uuid import uuid4

import random

from  game.gs import GS;

class indexHandler(BasicCtrl):
    def get(self):
        session = uuid4()
        self.render('index.html', page_title="hello!", session=session)

    def post(self):
        action = self.get_argument('action')
        session = self.get_argument('session')
        #print('recv post')
        if not session:
            self.set_status(400)
        if action == 'text':
            text='back:'+str(random.randint(10, 20))
            self.write('{"data":"%s"}' % GS.day())
            #self.write('recv post2')
        if action == 'signin':
            username = self.get_argument('name')
            pwd = self.get_argument('pwd')
            print ("username : %s , pwd : %s" % (username , pwd))
            self.write('{"sta": 0}')

    def on_finish(self):
        #print("on_finish")
        pass

    def on_connection_close(self):
        #print("on_connection_close")
        pass