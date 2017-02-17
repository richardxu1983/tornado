# urls
from ctrls.IndexHandler import indexHandler
from ctrls.LoginHandler import LoginHandler
from ctrls.LoginHandler import LogOutHandler
from ctrls.DebugHandler import debugHandler
from ctrls.UpdateHandler import updateHandler
from ctrls.SigninHandler import signinHandler
from ctrls.SignupHandler import signupHandler

import sys
reload(sys)

url = [
    (r"/", indexHandler),
    (r"/login", LoginHandler),
    (r"/signin", signinHandler),
    (r"/signup", signupHandler),
    (r"/logout", LogOutHandler),
    (r"/update", updateHandler),
    (r"/debug", debugHandler),
]
