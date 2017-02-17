import json
import sys
import os.path
import random

# place json data
_placeJsonFile = open('%s\\json\\Place.json' % os.path.dirname(sys.path[0]))
_placeJsonData = json.load(_placeJsonFile)

# map config data
_mpcJsonFile = open('%s\\json\\mapConfig.json' % os.path.dirname(sys.path[0]))
_mpcJsonData = json.load(_mpcJsonFile)

'''
map json file wold be like this:
{
    "1:2":{
        "type":2
    }
}
'''

data = {}


def main():

    width = _mpcJsonData["width"]
    height = _mpcJsonData["height"]

    for x in range(1, width + 1):
        for y in range(1, height + 1):
            r = random.randint(1, 100)
            type = 0
            for k in _mpcJsonData["tileChance"]:
                if r >= k["chance"][0] and r <= k["chance"][1]:
                    type = k["type"]
                    break
            if k["dump"] == 1:
                data["%s:%s" % (x, y)] = type

    # dump data to file
    with open('%s\\json\\map.json' % os.path.dirname(sys.path[0]), 'w') as f:
        json.dump(data, f)
    pass


if __name__ == "__main__":
    main()
