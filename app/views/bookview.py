from flask import make_response
from flask import request
import json
from app.utils.util import getTime
from app import app
from app.controller.bookController import insertService, serviceList, insertDoctor, doctorList, getDays

'''
增加服务项目
参数：
license_num
service_name
service_price
'''
@app.route('/book/addservice', methods=['GET'])
def goAddService():
    result = {}
    if request.method == 'GET':
        license_num = request.args.get('license_num')
        service_name = request.args.get('service_name')
        service_price = int(request.args.get('service_price'))
        service = {'license_num' : license_num, 'service_name' : service_name, 'service_price' : service_price}
        result = insertService(service=service)

    return make_response(json.dumps(result))


'''
获取服务列表
参数：
license_num
'''
@app.route('/book/getservicelist', methods=['GET'])
def getServiceList():
    result = []
    if request.method == 'GET':
        license_num = request.args.get('license_num')
        result = serviceList(license_num=license_num)

    return make_response(json.dumps(result))


'''
增加医生
参数：
license_num
doctor_name
doctor_tel
services
'''
@app.route('/book/adddoctor', methods=['GET'])
def goAddDoctor():
    result = {}
    if request.method == 'GET':
        license_num = request.args.get('license_num')
        doctor_name = request.args.get('doctor_name')
        doctor_tel = int(request.args.get('doctor_tel'))
        services = request.args.get('services')
        doctor = {'license_num' : license_num, 'doctor_name' : doctor_name, 'doctor_tel' : doctor_tel}
        doctor['services'] = services
        result = insertDoctor(doctor=doctor)

    return make_response(json.dumps(result))

'''
获取医生列表
参数：
license_num
'''
@app.route('/book/getdoctorlist', methods=['GET'])
def getDoctorList():
    result = []
    if request.method == 'GET':
        license_num = request.args.get('license_num')
        result = doctorList(license_num=license_num)

    return make_response(json.dumps(result))

'''
获取医生列表
参数：
license_num
'''
@app.route('/book/initbooking', methods=['GET'])
def initBooking():
    result = {}
    if request.method == 'GET':
        license_num = request.args.get('license_num')
        result['doctor_list'] = doctorList(license_num=license_num)
        result['service_list'] = serviceList(license_num=license_num)
        result['dayarray'] = getDays()

    return make_response(json.dumps(result))
