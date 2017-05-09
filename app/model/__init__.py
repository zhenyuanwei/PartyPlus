from pymongo import MongoClient

mongoURL = 'mongodb://localhost:27017//'
client = MongoClient(mongoURL)
mangodb = client['partyplus']

def getCollection(collectionName):
    collection = mangodb[collectionName]
    return collection