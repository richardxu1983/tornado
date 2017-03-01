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
MAP_FILE_BLOCK_NUM = 40


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
                idx = x / MAP_FILE_BLOCK_NUM
                idy = y / MAP_FILE_BLOCK_NUM
                if "%s-%s" % (idx, idy) not in data.keys():
                    data["%s-%s" % (idx, idy)] = {}
                data["%s-%s" % (idx, idy)]["%s:%s" % (x, y)] = type

    # dump data to file
    for k in data:
        filename = '%s\\json\\map\\%s.json' % (os.path.dirname(sys.path[0]), k)
        with open(filename, 'w') as f:
            # print(data[k])
            # print(filename)
            json.dump(data[k], f)
            print("finish : %s" % filename)


if __name__ == "__main__":
    main()
