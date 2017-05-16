from flask import make_response
from flask import request
import json
from app import app
from app.controller.wxsysController import doSaveAccessToken
from app.controller.wxsysController import getAnnouncement

'''
保存小程序的access_token API
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


'''
获取小程序的提示消息 API
参数：
program_id
'''
@app.route('/getannouncement', methods=['GET'])
def doGetAnnouncement():
    if request.method == 'GET':
        program_id = request.args.get('program_id')

    message = getAnnouncement(program_id=program_id)
    return make_response(json.dumps(message))