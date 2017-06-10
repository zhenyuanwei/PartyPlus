from app import app
from flask import render_template
from flask import session
from app.controller.wxsysController import getProgramList, getLicenseList
from app.controller.wxsysController import updateProgram, doDeleteProgram, removeData
from flask import request
from app.controller.wxsysController import addProgram, addLicense, deleteLicense, updateLicense, getLicense
from app.utils.util import getToday
from app.controller.partyController import getAllPary

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/party/partyguild')
def guild():
    return render_template('partyplus/partyguild.html')

@app.route('/party/partylist')
def partyList():
    isLogined = session.get('isLogined')

    if isLogined:
        partyList = getAllPary()
        return render_template('partyplus/partylist.html', partyList=partyList)
    else:
        return goLogin()

'''
web page for 小程序管理
'''
@app.route('/login')
def goLogin():
    session['isLogined'] = False
    template_name = 'wxsys/login.html'
    return render_template(template_name)

@app.route('/dologin', methods=['POST'])
def doLogin():
    username = ''
    password = ''
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

    if username == 'wzy' and password == 'zaq12wsx':
        session['isLogined'] = True
        return showProgramList()
    else:
        session['isLogined'] = False
        return goLogin()


@app.route('/wxsysannounce')
def wxsysAnnounce():
    template_name = 'wxsys/announce.html'
    isLogined = session.get('isLogined')

    if isLogined:
        programList = getProgramList()
        return render_template(template_name, programList=programList)
    else:
        return goLogin()

@app.route('/dowxsysannounce', methods=['POST'])
def doWxsysAnnounce():
    isLogined = session.get('isLogined')

    if isLogined:
        if request.method == 'POST':
            program_id = request.form.get('program_id')
            program_message = request.form.get('program_message')
            program = {'program_id' : program_id, 'program_message' : program_message}
            updateProgram(program=program)
        return showProgramList()
    else:
        return goLogin()

@app.route('/programlist')
def showProgramList():
    isLogined = session.get('isLogined')

    if isLogined:
        template_name = 'wxsys/programlist.html'
        programList = getProgramList()
        return render_template(template_name, programList=programList)
    else:
        return goLogin()

@app.route('/newprogram')
def goNewProgram():
    isLogined = session.get('isLogined')

    if isLogined:
        template_name = 'wxsys/newprogram.html'
        return render_template(template_name)
    else:
        return goLogin()

@app.route('/donewprogram', methods=['POST'])
def doNewProgram():
    isLogined = session.get('isLogined')

    if isLogined:
        if request.method == 'POST':
            program_name = request.form.get('program_name')
            program_id = request.form.get('program_id')
            wxsys = {'program_id': program_id, 'program_name':program_name}
            if program_name != '' and program_id!= '':
                addProgram(wxsys=wxsys)

        return showProgramList()
    else:
        return goLogin

@app.route('/deleteprogram', methods=['GET'])
def deleteProgram():
    isLogined = session.get('isLogined')

    if isLogined:
        if request.method == 'GET':
            program_id = request.args.get('program_id')
            doDeleteProgram(program_id=program_id)

        return showProgramList()
    else:
        return goLogin()

@app.route('/wxsyslicenselist')
def wxsysLicenseList():
    isLogined = session.get('isLogined')

    if isLogined:
        template_name = 'wxsys/licenselist.html'
        licenseList = getLicenseList()
        today = getToday()
        return render_template(template_name, licenseList=licenseList)
    else:
        return goLogin()

@app.route('/wxsysnewlicense')
def wxsysNewLicense():
    isLogined = session.get('isLogined')

    if isLogined:
        template_name = 'wxsys/newlicense.html'
        programList = getProgramList()
        today = getToday()
        return render_template(template_name, programList=programList, today=today)
    else:
        return goLogin()

@app.route('/dowxsysnewlicense', methods=['POST'])
def doWxsysNewLicense():
    isLogined = session.get('isLogined')

    if isLogined:
        license = {}
        if request.method == 'POST':
            license['program_id'] = request.form.get('program_id')
            license['company_name'] = request.form.get('company_name')
            license['tel_no'] = request.form.get('tel_no')
            license['license_start_date'] = request.form.get('license_start_date')
            license['license_period'] = request.form.get('license_period')
            addLicense(license=license)
        return wxsysLicenseList()
    else:
        return goLogin()

@app.route('/deletelicense', methods=['GET'])
def doDeleteLicense():
    isLogined = session.get('isLogined')

    if isLogined:
        license = {}
        if request.method == 'GET':
            license_num = request.args.get('license_num')
            deleteLicense(license_num=license_num)
        return wxsysLicenseList()
    else:
        return goLogin()


@app.route('/goupdatelicense', methods=['GET'])
def goUpdateLicense():
    isLogined = session.get('isLogined')

    if isLogined:
        license = {}
        if request.method == 'GET':
            license_num = request.args.get('license_num')
            template_name = 'wxsys/updatelicense.html'
            today = getToday()
            license = getLicense(license_num=license_num)
            return render_template(template_name, license=license, today=today)
    else:
        return goLogin()

@app.route('/doupdatelicense', methods=['POST'])
def doUpdateLicense():
    isLogined = session.get('isLogined')

    if isLogined:
        if request.method == 'POST':
            license = {}
            license['license_num'] = request.form.get('license_num')
            license['license_period'] = request.form.get('license_period')
            updateLicense(license=license)
        return wxsysLicenseList()
    else:
        return goLogin()

@app.route('/removedata', methods=['GET'])
def doRemoveData():
    isLogined = session.get('isLogined')

    if isLogined:
        if request.method == 'GET':
            program_id = request.args.get('program_id')
            removeData(program_id=program_id)
            return showProgramList()
    else:
        return goLogin()
