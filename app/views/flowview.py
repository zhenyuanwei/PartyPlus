from flask import make_response
from flask import request
import json
from app import app
from app.controller.flowController import getIssueList, saveIssue, getIssue

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
issue_expect_time
tel_no
issue_description
nickname
'''
@app.route('/flow/dosaveissue', methods=['GET'])
def doSaveIssue():
    issue = {}
    issue_id = ''
    if request.method == 'GET':
        issue['request_openId'] = request.args.get('openId')
        issue['license_num'] = request.args.get('license_num')
        issue['issue_name'] = request.args.get('issue_name')
        issue['issue_company'] = request.args.get('issue_company')
        issue['issue_expect_time'] = request.args.get('issue_expect_time')
        issue['tel_no'] = request.args.get('tel_no')
        issue['issue_description'] = request.args.get('issue_description')
        issue['nickname'] = request.args.get('nickname')
        issue_id = saveIssue(issue=issue)

    return make_response(json.dumps(issue_id))

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