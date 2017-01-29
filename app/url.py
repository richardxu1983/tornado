#urls

import sys
reload(sys)

from ctrls.IndexHandler import indexHandler
from ctrls.LoginHandler import LoginHandler
from ctrls.LoginHandler import LogOutHandler

url = [
    (r"/", indexHandler),
    (r"/login", LoginHandler),
    (r"/logout", LogOutHandler),
]
