from flask import make_response
from flask import request
import json
from app.utils.util import getTime
from app import app
from app.controller.flowController import getIssueList, saveIssue, getIssue, addEngineer, getEngineer, getEngineerList
from app.controller.flowController import setEngineerWX, getCompanyIssueList, updateIssueLogs, deleteEngineer
from app.controller.flowController import updateIssueStatus

'''
获取自己报修的问题列表
参数：
openId
'''
@app.route('/flow/goissuelist', methods=['GET'])
def goIssueList():
    result = ''
    if request.method == 'GET':
        openId = request.args.get('openId')
        result = getIssueList(request_openId=openId)

    return make_response(json.dumps(result))


'''
新增报修
参数：
openId
license_num
issue_name
issue_company
issue_address
issue_expect_time
tel_no
issue_description
nickname
'''
@app.route('/flow/dosaveissue', methods=['GET'])
def doSaveIssue():
    issue = {}
    res = {}
    if request.method == 'GET':
        issue['request_openId'] = request.args.get('openId')
        issue['license_num'] = request.args.get('license_num')
        issue['issue_name'] = request.args.get('issue_name')
        issue['issue_company'] = request.args.get('issue_company')
        issue['issue_address'] = request.args.get('issue_address')
        issue['issue_expect_time'] = request.args.get('issue_expect_time')
        issue['tel_no'] = request.args.get('tel_no')
        issue['issue_description'] = request.args.get('issue_description')
        issue['nickname'] = request.args.get('nickname')
        res = saveIssue(issue=issue)
    return make_response(json.dumps(res))


'''
获取自己报修的问题列表
参数：
issue_id
'''
@app.route('/flow/getissueinfo', methods=['GET'])
def goIssueInfo():
    result = {}
    if request.method == 'GET':
        issue_id = request.args.get('issue_id')
        result = getIssue(issue_id=issue_id)

    return make_response(json.dumps(result))


'''
增加工程师
参数：
license_num
engineer_name
tel_no
type
'''
@app.route('/flow/addengineer', methods=['GET'])
def goAddEngineer():
    engineer = {}
    engineer_id = ''
    if request.method == 'GET':
        engineer['license_num'] = request.args.get('license_num')
        engineer['engineer_name'] = request.args.get('engineer_name')
        engineer['tel_no'] = request.args.get('tel_no')
        engineer['type'] = request.args.get('type')
        engineer_id = addEngineer(engineer)

    return make_response(json.dumps(engineer_id))


'''
获取工程师信息
参数：
engineer_id
'''
@app.route('/flow/getengineerinfo', methods=['GET'])
def goGetEngineerInfo():
    engineer = {}
    if request.method == 'GET':
        engineer_id = request.args.get('engineer_id')
        engineer = getEngineer(engineer_id)

    return make_response(json.dumps(engineer))


'''
获取工程师List
参数：
license_num
'''
@app.route('/flow/getengineerlist', methods=['GET'])
def goGetEngineerList():
    engineerList = []
    if request.method == 'GET':
        license_num = request.args.get('license_num')
        engineerList = getEngineerList(license_num)

    return make_response(json.dumps(engineerList))

'''
注册工程师的openId和nickname
参数：
engineer_id
openId
nickname
'''
@app.route('/flow/updateengineerinfo', methods=['GET'])
def doUpdateEngineer():
    engineer = {}
    #license_num = '1495367951'
    if request.method == 'GET':
        engineer['engineer_id'] = request.args.get('engineer_id')
        engineer['openId'] = request.args.get('openId')
        engineer['nickname'] = request.args.get('nickname')
        license_num = setEngineerWX(engineer)

    return make_response(json.dumps(license_num))

'''
获取自己报修的问题列表
参数：
openId
'''
@app.route('/flow/gocompanyissuelist', methods=['GET'])
def goCompanyIssueList():
    result = []
    if request.method == 'GET':
        openId = request.args.get('openId')
        result = getCompanyIssueList(openId=openId)

    return make_response(json.dumps(result))

'''
保存报修的处理结果
参数：
openId
issue_id
license_num
process_comment
nickname
'''
@app.route('/flow/dosavelogs', methods=['GET'])
def doSaveLogs():
    issue = {}
    message = ''
    if request.method == 'GET':
        #issue['license_num'] = request.args.get('license_num')
        issue['issue_id'] = request.args.get('issue_id')
        logs = {}
        logs['openId'] = request.args.get('openId')
        logs['description'] = request.args.get('process_comment')
        logs['nickname'] = request.args.get('nickname')
        logs['create_time'] = getTime()
        issue['logs'] = logs
        message = updateIssueLogs(issue)

    return make_response(json.dumps(message))

'''
删除工程师
参数：
engineer_id
'''
@app.route('/flow/deleteengineer', methods=['GET'])
def goDeleteEngineer():
    result = {}
    if request.method == 'GET':
        engineer_id = request.args.get('engineer_id')
        deleteEngineer(engineer_id=engineer_id)

    return make_response(json.dumps(result))

'''
根据状态，完成或者取消报修
参数：
issue_id
issue_status
'''
@app.route('/flow/setstatus', methods=['GET'])
def doSetstatus():
    result = {}
    if request.method == 'GET':
        issue = {}
        issue_id = request.args.get('issue_id')
        issue_status = request.args.get('issue_status')
        issue['issue_id'] = issue_id
        issue['issue_status'] = issue_status
        description = ''
        if issue_status == '9':
            description = '确认处理情况，没有问题。'
        elif issue_status == '0':
            description = '报修取消。'
        logs = {}
        logs['openId'] = request.args.get('openId')
        logs['description'] = description
        logs['nickname'] = request.args.get('nickname')
        logs['create_time'] = getTime()
        issue['logs'] = logs
        result = updateIssueStatus(issue)

    return make_response(json.dumps(result))