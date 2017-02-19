# coding=utf-8
from tools.dbase import conn
import json
import random
import jsonData

_placeJsonFile = open('json/Place.json')
_placeJsonData = json.load(_placeJsonFile)

# map config data
_mpcJsonFile = open('json/mapConfig.json')
_mpcJsonData = json.load(_mpcJsonFile)

_mapJsonFile = open('json/map.json')
_mapJsonData = json.load(_mapJsonFile)

'''
print(_placeJsonData)
print("\n=====================================\n")
print(_placeJsonData[1])
print("\n=====================================\n")
print(type(_placeJsonData[1]["data"]["function"]))
print(type(_placeJsonData[1]["data"]["function"]))
for v in _placeJsonData[1]["data"]["function"]:
    print v["type"]
'''

PlayerGap = 2
RandomGap = PlayerGap * 2 + 1
BELONG_NONE = 0
BELONG_NPC = 1
BELONG_PLAYER = 999


class map(object):

    def __init__(self):
        self.width = _mpcJsonData["width"]
        self.height = _mpcJsonData["height"]
        pass

    def load(self):
        # 获取搜索阶段
        phase = conn.get('map:searchPhase')
        if not phase:
            conn.set('map:searchPhase', 1)
            conn.set('map:searchSeg', 1)
            conn.set('map:searchIndex', 0)

    # 检测是否可以放置玩家
    def canPutPlayer(self, x, y):
        belong = 0
        str = 0
        for i in range(x - PlayerGap, x + PlayerGap + 1):
            for j in range(y - PlayerGap, y + PlayerGap + 1):
                if i <= 0 or j <= 0:
                    if i > self.width or j > self.height:
                        return False
                if conn.exists('place:%s:%s' % (i, j)):
                    str = conn.hmget('place:%s:%s' % (i, j), 'belong')
                    if str[0] is None:
                        continue
                    belong = int(str[0])
                    if belong != BELONG_NONE:
                        return False
        return True

    def setHomeForPlayer(self, uid, x, y):
        slotNum = int(_placeJsonData[0]["FacilitySlot"])
        placeid = 'place:%s:%s' % (x, y)
        slotIndex = 0
        pipeline = conn.pipeline(True)
        pipeline.hmset(
            placeid, {
                'belong': BELONG_PLAYER,
                'belongTo': uid,
                'type': 0,
                'level': 1,
                'slotNum': slotNum,
                'slotIndex': slotIndex,
            })

        # slot
        if slotNum > 0:
            for i in range(1, slotNum + 1):
                pipeline.hmset(placeid, {'slot:%s' % i: 0, })

        # Facilities
        for v in _placeJsonData[0]["initFacilities"]:
            slotIndex += 1
            pipeline.hmset(
                placeid, {
                    'slot:%s:type' % slotIndex: v["type"],
                    'slotIndex': slotIndex,
                })

        # store
        room = int(_placeJsonData[0]["store"])
        pipeline.hmset('store:%s:%s' % (x, y), {'room': room})
        for i in range(1, room + 1):
            pipeline.hmset(
                'store:%s:%s' % (x, y), {
                    'room:%s' % i: 0,
                })
        pipeline.execute()
        pass

    def CreateNewHomeBlock(self, uid):
        return self.findAPlaceFor(uid, 300, 300, 3)

    def findAPlaceFor(self, uid, x, y, radius):
        phase = int(conn.get('map:searchPhase'))
        seg = int(conn.get('map:searchSeg'))
        index = int(conn.get('map:searchIndex'))

        while True:
            if phase == 1:
                minPos = x - RandomGap * seg + index
                maxPos = x + radius + RandomGap * (seg - 1) + 1
                for i in range(minPos, maxPos):
                    py = random.randint(
                        y + 1 + RandomGap * (seg - 1),
                        y + RandomGap * seg)
                    if self.canPutPlayer(i, py):
                        self.setHomeForPlayer(uid, i, py)
                        conn.set('map:searchIndex', i)
                        return i, py
                phase += 1
                conn.set('map:searchPhase', phase)

            if phase == 2:
                for py in range(
                        y - radius + RandomGap * (seg - 1) + index,
                        y + RandomGap * seg):
                    px = random.randint(
                        x + radius + 1 + RandomGap * (seg - 1),
                        x + radius + RandomGap * seg)
                    if self.canPutPlayer(px, py):
                        self.setHomeForPlayer(uid, px, py)
                        conn.set('map:searchIndex', py)
                        return px, py
                phase += 1
                conn.set('map:searchPhase', phase)

            if phase == 3:
                for px in range(
                        x - RandomGap * (seg - 1) + index,
                        x + radius + RandomGap * seg):
                    py = random.randint(
                        y - radius - 1 - RandomGap * (seg - 1),
                        y - radius - RandomGap * seg)
                    if self.canPutPlayer(px, py):
                        self.setHomeForPlayer(uid, px, py)
                        conn.set('map:searchIndex', px)
                        return px, py
                phase += 1
                conn.set('map:searchPhase', phase)

            if phase == 4:
                for py in range(
                        y - radius - RandomGap * seg + index,
                        y + RandomGap * (seg - 1)):
                    px = random.randint(x - RandomGap * seg,
                                        x - 1 - RandomGap * (seg - 1))
                    if self.canPutPlayer(px, py):
                        self.setHomeForPlayer(uid, px, py)
                        conn.set('map:searchIndex', py)
                        return px, py
                phase = 1
                conn.set('map:searchPhase', phase)
                seg += 1
                conn.set('map:searchSeg', seg)

        return 0, 0


class place():

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.type = 0
        pass

    def load(self):
        pass

    def readFromDB(self):
        pass


MAP = map()  # a singlton for map
