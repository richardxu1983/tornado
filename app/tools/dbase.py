#coding=utf-8
'''
import torndb
import MySQLdb

host = "localhost"
username = "29cun"
pwd = "P*7RZHp#MyadRUh9"
port = 3306

dbcon = MySQLdb.connect(host=host, user=username, passwd=pwd, port=port)

'''

import redis
import uuid
import time
import math
import binascii
import os

conn = redis.Redis(host='localhost', port=6379, db=0)

info = conn.info()
print '\ndbsize: %s' % conn.dbsize()
#print(conn.flushdb())
print(conn.keys())

#print(time.asctime( time.localtime(time.time()) ))

#acquire_lock_with_timeout
def acquire_lock_with_timeout(conn, lockname, acquire_timeout=10, lock_timeout=10):
	identifier = str(uuid.uuid4())
	lockname = 'lock:' + lockname
	lock_timeout = int(math.ceil(lock_timeout))

	end = time.time() + acquire_timeout
	while time.time() < end:
		if conn.setnx(lockname, identifier):
			conn.expire(lockname, lock_timeout)
			return identifier
		elif not conn.ttl(lockname):
			conn.expire(lockname, lock_timeout)

		time.sleep(.001)

	return False

#release_lock
def release_lock(conn, lockname, identifier):
	pipe = conn.pipeline(True)
	lockname = 'lock:' + lockname

	while True:
		try:
			pipe.watch(lockname)
			if pipe.get(lockname)==identifier:
				pipe.multi()
				pipe.delete(lockname)
				pipe.execute()
				return True
			pipe.unwatch()
			break;
		except redis.exceptions.WatchError:
			pass

	return False

# 在用户登录的时候,给用户设置一个随机字符串,每次登录时会改变。
def set_login_code(username):
    login_code = binascii.b2a_hex(os.urandom(16))
    conn.set("%s:login_code" % username, login_code)

# 根据用户名获取随机字符串
def get_login_code(username):
    if conn.get("%s:login_code" % username) == None:  # 若获取随机字符串时为空,则先设置一个,再获取
        set_login_code(username)
        get_login_code(username)
    else:
        return conn.get("%s:login_code" % username)