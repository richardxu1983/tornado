#
from  tools.dbase import rdb;
import tornado

class gameServer():

    bGSon = False;

    def __init__(self):
        self._day = 0

    def redDB(self):
        info = rdb.info()
        print '\ndbsize: %s' % rdb.dbsize()
        print "ping %s" % rdb.ping()

    def update(self):
        pass
        #self._day += 1;
        #print("update")

    def callbackfun(result):
        print(result)

    def start(self):
        self.redDB()
        self.bGSon = True;
        print("login start")

    def stop(self):
        print("login stop")

    def day(self):
        return self._day;

GS = gameServer();