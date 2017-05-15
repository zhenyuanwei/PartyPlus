from flask import make_response
from flask import request
from flask import render_template
import json
from app import app
from app.controller.wxsysController import doSaveAccessToken

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