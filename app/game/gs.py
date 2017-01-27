#
from  tools.dbase import conn;
import tornado

DAY_SEC = 10

class gameServer():

    bGSon = False;

    def __init__(self):
        self._day = 0
        self.counter = 0

    def redDB(self):
        info = conn.info()
        print '\ndbsize: %s' % conn.dbsize()
        print "ping %s" % conn.ping()

        #get string key
        dbDay = conn.get('day')
        print ('dbDay : %s' % dbDay)
        if dbDay==None:
            #set string key
            conn.set('day',self._day)
            print ('Day : %s' % conn.get('day'))
        else:
            self._day = int(dbDay)

        salt = conn.get('salt')
        print salt

    def update(self):
        self.counter += 1
        if self.counter>=DAY_SEC:
            self._day+=1
            self.counter = 0
            conn.set('day',self._day)
            print ('Day : %s' % conn.get('day'))
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