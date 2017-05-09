from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime

'''
Attendee Layout
_id  自动编号
party_id   关联到party的party_id
attend_id  TimeStamp
attendee_name
wechat_name
tel_no
attendee_openid
attend_status      #0 取消， 1 参加
payment_flag      #0 未支付，1 已支付    
create_time       #自动设定
update_time       #自动设定
'''
class AttendeeModel:
    __collectionName = 'attendee_collection'

    def insert(self, attendee):
        attendee['attend_id'] = getTimeStamp()
        attendee['create_time'] = getTime()
        attendee['update_time'] = getTime()
        attendee['attend_status'] = '1'
        attendee['payment_flag'] = '0'
        attendee_collection = getCollection(collectionName=self.__collectionName)
        attendee_collection.insert(attendee)
        return attendee['attend_id']

    def findByParty(self, party_id=None):
        attendee_collection = getCollection(collectionName=self.__collectionName)
        if None == party_id:
            attendees = attendee_collection.find()
            return attendees
        else:
            query_key = {'party_id': party_id}
            attendee = attendee_collection.find(query_key)
            return attendee

    def findByOpenId(self, open_id):
        attendee_collection = getCollection(collectionName=self.__collectionName)
        query_key = {'attendee_openid': open_id}
        attendees = attendee_collection.find(query_key)
        return attendees

    def update(self, attendee):
        attendee_collection = getCollection(collectionName=self.__collectionName)
        attend_id = attendee['attend_id']
        for key in attendee:
            if key != 'attend_id' and key != '_id' :
                attendee_collection.update({'attend_id': attend_id}, {'$set': {key: attendee[key]}})

    def delete(self, attend_id):
        attendee_collection = getCollection(collectionName=self.__collectionName)
        attend = self.find(attend_id=attend_id)
        attendee_collection.delete_one(attend)

attend = AttendeeModel()
'''wzy = {'party_id' : '1494296353',
       'attendee_name' : 'wzy',
       'wechat_name' : 'Kevin',
       'tel_no' : '18604110001',
       'attendee_openid' : 'tsfljfljfajfajfiesepmq'
       }'''
#print(attend.insert(attendee=wzy))
attendees = attend.findByParty(party_id='1494296353')
for attendee in attendees:
    print(attendee)