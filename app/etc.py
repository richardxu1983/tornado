#coding=utf-8

import os.path
import sys
import time

etc = {}

etc['debug'] = True
etc['error'] = False
etc['servs'] = 'AL/1.0.%s' % int(time.time())

etc['root_path'] = sys.path[0]
etc['login_url'] = '/login'
etc['xsrf_cookies'] = True
etc['cookie_secret'] = 'JlgGn8GoT8CedtwuEr6cyE7NI9G9dUZ3pnp4ea/1ISE='
etc['template_path'] = os.path.join(etc['root_path'], 'app', 'views', '')
etc['static_path'] = os.path.join(etc['root_path'], 'www', 'assets')
etc['database_path'] = os.path.join(etc['root_path'], 'var', 'datas', '')
