#
from  tools.dbase import conn;
import tornado

from gday import GDay

class gameServer():

    bGSon = False;

    def __init__(self):
        pass

    def readDB(self):
        GDay.readDB()

    def update(self):
        GDay.update()

    def callbackfun(result):
        print(result)

    def start(self):
        GDay.init()
        self.readDB()
        self.bGSon = True

    def stop(self):
        print("login stop")

    def day(self):
        return self._day;

GS = gameServer();