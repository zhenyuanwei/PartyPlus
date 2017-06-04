from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime

'''
服务数据模型
service_id             #服务编号
license_num            #版权编号  标记这个属于哪个公司
service_name           #服务名称
service_price          #服务价格
delete_flag            #1 有效， 0 删除
create_time            #自动设定
update_time            #自动设定
'''
class ServiceModel:
    __collectionName = 'service_collection'
    __default_key = {'delete_flag': {'$in': ['1']}}

    def insert(self, service):
        service_id = getTimeStamp()
        service['service_id'] = service_id
        service['create_time'] = getTime()
        service['update_time'] = getTime()
        service['delete_flag'] = '1'
        service_collection = getCollection(collectionName=self.__collectionName)
        service_collection.insert(service)
        return service

    def finds(self, license_num):
        service_collection = getCollection(collectionName=self.__collectionName)
        query_key = {'license_num': license_num}
        query_condition = {'$and': [self.__default_key, query_key]}
        services = service_collection.find(query_condition)
        return services

    def findById(self, service_id):
        service_collection = getCollection(collectionName=self.__collectionName)
        query_key = {'service_id': service_id}
        query_condition = {'$and': [self.__default_key, query_key]}
        service = service_collection.find_one(query_condition)
        return service

'''
医生数据模型
doctor_id              #医生编号
license_num            #版权编号  标记这个属于哪个公司
doctor_name            #医生姓名
doctor_tel             #医生电话
services               #医生服务项目
delete_flag            #1 有效， 0 删除
create_time            #自动设定
update_time            #自动设定
'''
class DoctorModel:
    __collectionName = 'doctor_collection'
    __default_key = {'delete_flag': {'$in': ['1']}}

    def insert(self, doctor):
        doctor_id = getTimeStamp()
        doctor['doctor_id'] = doctor_id
        doctor['create_time'] = getTime()
        doctor['update_time'] = getTime()
        doctor['delete_flag'] = '1'
        doctor_collection = getCollection(collectionName=self.__collectionName)
        doctor_collection.insert(doctor)
        return doctor

    def finds(self, license_num):
        doctor_collection = getCollection(collectionName=self.__collectionName)
        query_key = {'license_num': license_num}
        query_condition = {'$and': [self.__default_key, query_key]}
        doctors = doctor_collection.find(query_condition)
        return doctors