#
import json

_buildFile = open('json/build.json')
_expandFile = open('json/expand.json')
_gatherFile = open('json/gather.json')
_storeFile = open('json/store.json')

_build = json.load(_buildFile)
_expand = json.load(_expandFile)
_gather = json.load(_gatherFile)
_store = json.load(_storeFile)
