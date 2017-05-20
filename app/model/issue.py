from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime

'''
报修Plus的数据模型
issue_id             #报修问题编号
license_num          #版权编号  标记这个属于哪个公司
issue_name           #报修问题标题
issue_request_time   #期待完成时间
tel_no               #联系方式
request_openId       #报修发起者openId
issue_description    #报修问题描述
issue_status               #状态 0 取消，9完成，1申请中
logs                 #处理log，List对象，每个元素都是字典类型
    openId           #处理者的openId
    description      #处理方式
    create_time      #处理时间
create_time          #自动设定
update_time          #自动设定
'''

class IssueModel:
    __collectionName = 'issue_collection'
    __default_key = {'issue_status': {'$in': ['1']}}

    def finds(self):
        issue_collection = getCollection(collectionName=self.__collectionName)
        issueList = issue_collection.find()
        return issueList

    def findByOpenId(self, request_openId):
        issue_collection = getCollection(collectionName=self.__collectionName)

        query_key = {'request_openId': request_openId}
        query_condition = {'$and': [self.__default_key, query_key]}
        issueList = issue_collection.find(query_condition)
        return issueList

    def findByLicense(self, license_num):
        issue_collection = getCollection(collectionName=self.__collectionName)

        query_key = {'license_num': license_num}
        query_condition = {'$and': [self.__default_key, query_key]}
        issueList = issue_collection.find(query_condition)
        return issueList