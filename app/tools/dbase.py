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

rdb = redis.Redis(host='localhost', port=6379, db=0)