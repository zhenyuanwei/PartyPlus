from app import app
from flask import render_template
from app.controller.wxsysController import getProgramList
from app.controller.wxsysController import updateProgram
from flask import request

@app.route('/helloworld')
def hello_world():
    return 'Hello World!'

@app.route('/partyguild')
def guild():
    return render_template('partyguild.html')

'''
web page for 小程序管理
'''
@app.route('/')
def goLogin():
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
        return showProgramList()
    else:
        return goLogin()


@app.route('/wxsysannounce')
def wxsysAnnounce():
    template_name = 'wxsys/announce.html'
    programList = getProgramList()
    return render_template(template_name, programList=programList)

@app.route('/dowxsysannounce', methods=['POST'])
def doWxsysAnnounce():
    if request.method == 'POST':
        program_id = request.form.get('program_id')
        program_message = request.form.get('program_message')
        program = {'program_id' : program_id, 'program_message' : program_message}
        updateProgram(program=program)
    return showProgramList()

@app.route('/programlist')
def showProgramList():
    template_name = 'wxsys/programlist.html'
    programList = getProgramList()
    return render_template(template_name, programList=programList)
