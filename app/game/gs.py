
class gameServer():

    bGSon = False;

    def __init__(self):
        self._day = 0
        print("init")

    def update(self):
        self._day += 1;
        #print("update")

    def start(self):
        self.bGSon = True;
        print("login start")

    def stop(self):
        print("login stop")

    def day(self):
        return self._day;

GS = gameServer();