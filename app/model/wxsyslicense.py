from app.model import getCollection
from app.utils.util import getTimeStamp
from app.utils.util import getTime
from app.utils.util import getToday, addDays

'''
微信小程序版权的数据模型
program_id           #小程序编号
license_num          #版权编号
license_period       #版权期间
license_start_date   #版权开始日期
license_end_date    #版权结束日期
create_time          #自动设定
update_time          #自动设定
'''


class WxSysLicenseMondel:
    __collectionName = 'wxsyslicense_collection'

    def findById(self, license_num):
        query_key = {'license_num': license_num}
        wxsyslicense_collection = getCollection(collectionName=self.__collectionName)
        wxsyslicense = wxsyslicense_collection.find_one(query_key)
        return wxsyslicense

    def finds(self):
        wxsyslicense_collection = getCollection(collectionName=self.__collectionName)
        licenseList = wxsyslicense_collection.find()
        return licenseList

    def update(self, wxsyslicense):
        wxsyslicense_collection = getCollection(collectionName=self.__collectionName)
        license_num = wxsyslicense['license_num']
        wxsyslicense['license_end_date'] = addDays(wxsyslicense['license_end_date'],
                                                   int(wxsyslicense['license_period']) + 1)
        wxsyslicense['update_time'] = getTime()
        for key in wxsyslicense:
            if key != 'license_num' and key != '_id':
                wxsyslicense_collection.update({'license_num': license_num}, {'$set': {key: wxsyslicense[key]}})
        return license_num

    def insert(self, wxsyslicense):
        wxsyslicense['license_num'] = getTimeStamp()
        if wxsyslicense['license_start_date'] == '':
            wxsyslicense['license_start_date'] = getToday()
        wxsyslicense['license_end_date'] = addDays(wxsyslicense['license_start_date'],
                                                   int(wxsyslicense['license_period']) + 1)
        wxsyslicense['create_time'] = getTime()
        wxsyslicense['update_time'] = getTime()
        wxsyslicense_collection = getCollection(collectionName=self.__collectionName)
        wxsyslicense_collection.insert(wxsyslicense)
        return wxsyslicense['license_num']

    def updateLicense(self, wxsyslicense):

        if 'license_num' in wxsyslicense:
            license_num = wxsyslicense['license_num']
            wxsysLicenseTemp = self.findById(license_num=license_num)
            if None == wxsysLicenseTemp:
                license_num = self.insert(wxsyslicense)
            else:
                license_num = self.update(wxsyslicense)
        else:
            license_num = self.insert(wxsyslicense)
        return license_num
