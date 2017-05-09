from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime

'''
Party Layout
_id  自动编号
party_id  TimeStamp
party_name
party_time
party_location
party_status      #0 取消， 1 进行中， 9 完成
party_total_num   #最大参与人数
party_attend_num  #报名人数
payment_flag      #0 不需要支付，1 需要支付
create_openid     
create_time       #自动设定
update_time       #自动设定

'''
class PartyModel:
    __collectionName = 'party_collection'

    def insert(self, party):
        party['party_id'] = getTimeStamp()
        party['create_time'] = getTime()
        party['update_time'] = getTime()
        party['party_status'] = '1'
        party['party_attend_num'] = 0
        party['payment_flag'] = '0'
        party_collection = getCollection(collectionName=self.__collectionName)
        party_collection.insert(party)
        return party['party_id']

    def find(self, party_id=None):
        party_collection = getCollection(collectionName=self.__collectionName)
        if None == party_id:
            partys = party_collection.find()
            return partys
        else:
            query_key = {'party_id': party_id}
            party = party_collection.find_one(query_key)
            return party

    def findByOpenId(self, open_id):
        party_collection = getCollection(collectionName=self.__collectionName)
        query_key = {'create_openid': open_id}
        partys = party_collection.find(query_key)
        return partys

    def update(self, party):
        party_collection = getCollection(collectionName=self.__collectionName)
        party_id = party['party_id']
        for key in party:
            if key != 'party_id' and key != '_id' :
                party_collection.update({'party_id': party_id}, {'$set': {key: party[key]}})

    def delete(self, party_id):
        party_collection = getCollection(collectionName=self.__collectionName)
        party = self.find(party_id=party_id)
        party_collection.delete_one(party)

'''watsonParty = {'party_id' : '1494296353',
               'party_name' : 'Watson Session',
               'party_attend_num' : 3,
               'create_openid' : 'oBSns0F4uo1EZi9oFFvRUXMyLbpo'
               }'''
#party_id = '1494296353'

#party = PartyModel()
#party.update(party=watsonParty)
#partys = party.find()
#partys = party.findByOpenId(open_id='Txdedgdaeapfdadsdsff')
#for item in partys:
#    print(item)