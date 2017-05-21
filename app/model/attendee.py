from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime

'''
Attendee Layout
_id  自动编号
party_id   关联到party的party_id
attendee_name
wechat_name
tel_no
attendee_openid
attend_id  TimeStamp
comment           #参与者的备注内容
formId            #参加活动是的formId，用于发送完成或取消消息到用户
attend_status     #0 取消， 1 参加, 8 隐藏， 9 完成, 7 活动取消
payment_flag      #0 未支付，1 已支付    
create_time       #自动设定
update_time       #自动设定
'''
class AttendeeModel:
    __collectionName = 'attendee_collection'
    default_key = {'attend_status': {'$in': ['1', '7']}}

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
        #隐藏之后的参与活动也能在活动状态画面查询到
        #default_key = self.default_key.copy()
        default_key = {'attend_status': {'$in': ['1', '8']}}
        if None == party_id:
            attendees = attendee_collection.find(default_key)
            return attendees
        else:
            query_key = {'party_id': party_id}
            query_condition = {'$and': [default_key, query_key]}
            attendee = attendee_collection.find(query_condition)
            return attendee

    def findByOpenId(self, open_id):
        attendee_collection = getCollection(collectionName=self.__collectionName)

        query_key = {'attendee_openid': open_id}
        query_condition = {'$and': [self.default_key, query_key]}
        attendees = attendee_collection.find(query_condition)
        return attendees

    def findByAttendeeId(self, attend_id):
        attendee_collection = getCollection(collectionName=self.__collectionName)

        query_key = {'attend_id': attend_id}
        query_condition = {'$and': [self.default_key, query_key]}
        attendee = attendee_collection.find_one(query_condition)
        return attendee

    def update(self, attendee):
        attendee_collection = getCollection(collectionName=self.__collectionName)
        attend_id = attendee['attend_id']
        attendee['update_time'] = getTime()
        for key in attendee:
            if key != 'attend_id' and key != '_id' :
                attendee_collection.update({'attend_id': attend_id}, {'$set': {key: attendee[key]}})

    def delete(self, attend_id):
        attendee_collection = getCollection(collectionName=self.__collectionName)
        delete_key = {'attend_id': attend_id}
        attendee_collection.delete_one(delete_key)

#attend = AttendeeModel()
'''wzy = {'party_id' : '1494296353',
       'attendee_name' : 'wzy',
       'wechat_name' : 'Kevin',
       'tel_no' : '18604110001',
       'attend_id': '1494298352',
       'attendee_openid' : 'oBSns0F4uo1EZi9oFFvRUXMyLbpo'
       }'''
#print(attend.insert(attendee=wzy))
#attend.update(attendee=wzy)
#attendees = attend.findByParty(party_id='1494296353')
'''attendees = attend.findByOpenId(open_id='oBSns0F4uo1EZi9oFFvRUXMyLbpo')
for attendee in attendees:
    print(attendee)'''