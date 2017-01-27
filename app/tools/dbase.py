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

conn = redis.Redis(host='localhost', port=6379, db=0)

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

#
def gen_salt():
	salt = conn.get('salt')
	if salt==None:
		#set string key
		conn.set('salt','ff20934g34hg7d')

gen_salt()