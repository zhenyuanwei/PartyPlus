import json

from flask import make_response
from flask import request

from app import app
from app.controller.attendeeController import cancelAttendPary
from app.controller.attendeeController import doAttendParty
from app.controller.attendeeController import hiddenAttendPary
from app.controller.partyController import cancelParty
from app.controller.partyController import completePary
from app.controller.partyController import createPartyEntry
from app.controller.partyController import getAttendedPartyList
from app.controller.partyController import getOwnPartyList
from app.controller.partyController import getPartyInfos, updateParty, pauseParty

'''
获取自己创建的活动列表
参数：openId
'''
@app.route('/getownedpartylist', methods=['GET'])
def getOwnedPartyList():
    openId = None
    if request.method == 'GET':
        openId = request.args.get('openId')
    partys = getOwnPartyList(openId=openId)
    return make_response(json.dumps(partys))

'''
获取活动信息和参与者名单
参数：
party_id
openId  可选，提供了openId，返回的聚会信息的参加者仅openId的参加者
'''
@app.route('/getpartyinfo', methods=['GET'])
def getPartyInfo():
    party_id = None
    openId = None
    if request.method == 'GET':
        party_id = request.args.get('party_id')
        try:
            openId = request.args.get('openId')
        except:
            openId = None
    party = getPartyInfos(party_id=party_id, attendee_openid=openId)


    return make_response(json.dumps(party))

'''
获取参与活动的列表
参数：openId
'''
@app.route('/getattendpartylist', methods=['GET'])
def getAttendPartyList():
    openId = None
    if request.method == 'GET':
        openId = request.args.get('openId')
    partys = getAttendedPartyList(open_id=openId)
    return make_response(json.dumps(partys))

'''
参加活动
参数：
party_id，
openId
wechat_name
attendee_name
tel_no
formId
comment
'''
@app.route('/attendparty', methods=['GET'])
def attendParty():
    attendee = {}
    if request.method == 'GET':
        attendee['party_id'] = request.args.get('party_id')
        attendee['attendee_openid'] = request.args.get('openId')
        attendee['wechat_name'] = request.args.get('wechat_name')
        attendee['attendee_name'] = request.args.get('attendee_name')
        attendee['tel_no'] = request.args.get('tel_no')
        attendee['formId'] = request.args.get('formId')
        attendee['comment'] = request.args.get('comment')
    party_id = doAttendParty(attendee=attendee)
    return make_response(party_id)

'''
创建活动
参数：
party_name
party_time
party_location
party_total_num
openId
comment
latitude
longitude
'''
@app.route('/createparty', methods=['GET'])
def createParty():
    party = {}
    if request.method == 'GET':
        party['party_name'] = request.args.get('party_name')
        party['party_time'] = request.args.get('party_time')
        party['party_location'] = request.args.get('party_location')
        party['latitude'] = request.args.get('latitude')
        party['longitude'] = request.args.get('longitude')
        party['party_total_num'] = int(request.args.get('party_total_num'))
        party['create_openid'] = request.args.get('openId')
        party['comment'] = request.args.get('comment')
    print(party)
    res = createPartyEntry(party=party)
    return make_response(res)

'''
取消活动报名
参数：
attend_id  报名编号
'''
@app.route('/cancelattend', methods=['GET'])
def doCancelAttendParty():
    attend_id = None
    result = "success"
    if request.method == 'GET':
        attend_id = request.args.get('attend_id')

    try:
        cancelAttendPary(attend_id=attend_id)
    except :
        result = "fail"

    return make_response(json.dumps(result))

'''
隐藏参加的活动中报名
参数：
attend_id  报名编号
'''
@app.route('/hiddenattend', methods=['GET'])
def doHiddenAttendParty():
    attend_id = None
    result = "success"
    if request.method == 'GET':
        attend_id = request.args.get('attend_id')

    try:
        hiddenAttendPary(attend_id=attend_id)
    except :
        result = "fail"

    return make_response(json.dumps(result))

'''
完成活动
参数：
party_id  报名编号
'''
@app.route('/completeparty', methods=['GET'])
def doCompleteParty():
    party_id = None
    result = None
    if request.method == 'GET':
        party_id = request.args.get('party_id')

    try:
        result = completePary(party_id=party_id)
    except :
        result = []

    return make_response(json.dumps(result))

'''
取消活动
参数：
party_id  报名编号
'''
@app.route('/cancelparty', methods=['GET'])
def doCancelParty():
    party_id = None
    result = None
    if request.method == 'GET':
        party_id = request.args.get('party_id')

    try:
        result = cancelParty(party_id=party_id)
    except :
        result = []

    return make_response(json.dumps(result))

'''
更新活动
参数：
party_id  报名编号
party_name
party_time
party_location
party_total_num
openId
comment
'''
@app.route('/updateparty', methods=['GET'])
def doUpdateParty():
    party = {}
    if request.method == 'GET':
        party['party_id'] = request.args.get('party_id')
        #party['party_name'] = request.args.get('party_name')
        party['party_time'] = request.args.get('party_time')
        party['party_location'] = request.args.get('party_location')
        party['party_total_num'] = int(request.args.get('party_total_num'))
        openId = request.args.get('openId')
        party['comment'] = request.args.get('comment')
        #保存数据到Mongo DB
        updateParty(party=party)
        newparty = getPartyInfos(party_id=party['party_id'], attendee_openid=openId)

    return make_response(json.dumps(newparty))

'''
活动报名截止
参数：
party_id  报名编号
'''
@app.route('/pauseparty', methods=['GET'])
def doPauseParty():
    party_id = None
    result = []
    if request.method == 'GET':
        party_id = request.args.get('party_id')

    try:
        result = pauseParty(party_id=party_id)
        print()
    except :
        result = []

    return make_response(json.dumps(result))
