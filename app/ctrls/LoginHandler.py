# coding=utf-8
from basic import BasicCtrl
from uuid import uuid4


class LoginHandler(BasicCtrl):

    def get(self):
        self.clear_cookie("user")
        self.clear_cookie("login_code")
        session = uuid4()
        self.render('login.html', page_title="welcome!", session=session, date='ff20934g34hg7d')

    def on_finish(self):
        # print("on_finish")
        pass

    def on_connection_close(self):
        # print("on_connection_close")
        pass


class LogOutHandler(BasicCtrl):
    def get(self, *args, **kwargs):
        self.clear_all_cookies()
        self.redirect("/")
