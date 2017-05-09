from pymongo import MongoClient

#for docker-compose
mongoURL = 'mongodb://mongodb:27017//'
#for localhost
#mongoURL = 'mongodb://localhost:27017//'

client = MongoClient(mongoURL)
mangodb = client['partyplus']

def getCollection(collectionName):
    collection = mangodb[collectionName]
    return collection