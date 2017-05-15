from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime

'''
微信小程序的数据模型
program_id           #小程序编号
program_name         #小程序名字
program_message      #小程序消息
access_token         #小程序的access_token
create_time          #自动设定
update_time          #自动设定
'''
class WxSysMondel:
    __collectionName = 'wxsys_collection'

    def insert(self, wxsys):
        wxsys['program_id'] = getTimeStamp()
        wxsys['access_token'] = ''
        wxsys['program_message'] = ''
        wxsys['create_time'] = getTime()
        wxsys['update_time'] = getTime()
        wxsys_collection = getCollection(collectionName=self.__collectionName)
        wxsys_collection.insert(wxsys)
        return wxsys['program_id']

    def update(self, wxsys):
        wxsys_collection = getCollection(collectionName=self.__collectionName)
        program_id = wxsys['program_id']
        wxsys['update_time'] = getTime()
        for key in wxsys:
            if key != 'program_id' and key != '_id':
                wxsys_collection.update({'program_id': program_id}, {'$set': {key: wxsys[key]}})

    def findById(self, program_id):
        query_key = {'program_id': program_id}
        wxsys_collection = getCollection(collectionName=self.__collectionName)
        wxsys = wxsys_collection.find_one(query_key)
        return wxsys

    def finds(self):
        wxsys_collection = getCollection(collectionName=self.__collectionName)
        wxsysList = wxsys_collection.find()
        return wxsysList

'''wxsys = {'program_name':'报单Plus'}
wxSysModel = WxSysMondel()
print(wxSysModel.insert(wxsys))
program_id = '1494805256'
'''