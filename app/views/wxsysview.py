from flask import make_response
from flask import request
import json
from app import app
from app.controller.wxsysController import doSaveAccessToken

'''
获取自己创建的活动列表
参数：
program_id
access_token
'''
@app.route('/saveaccesstoken', methods=['GET'])
def saveAccessToken():
    if request.method == 'GET':
        program_id = request.args.get('program_id')
        access_token = request.args.get('access_token')

    result = doSaveAccessToken(program_id=program_id, access_token=access_token)
    return make_response(json.dumps(result))