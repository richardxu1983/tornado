from basic import BasicCtrl
from uuid import uuid4

import random


class indexHandler(BasicCtrl):
    def get(self):
        session = uuid4()
        self.render('index.html', page_title="hello!", session=session)

    def post(self):
        action = self.get_argument('action')
        session = self.get_argument('session')
        if not session:
            self.set_status(400)
        if action == 'text':
            text='back:'+str(random.randint(10, 20))
            self.write('{"data":"%s"}' % text)