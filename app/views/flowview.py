from flask import make_response
from flask import request
import json
from app import app
from app.controller.flowController import getIssueList

'''
获取自己报修的问题列表
参数：
openId
'''
@app.route('/goissuelist', methods=['GET'])
def goIssueList():
    result = ''
    if request.method == 'GET':
        openId = request.args.get('openId')
        result = getIssueList(request_openId=openId)

    return make_response(json.dumps(result))