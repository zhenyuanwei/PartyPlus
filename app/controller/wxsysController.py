from app.model.wxsys import WxSysMondel
from app.model.wxsyslicense import WxSysLicenseMondel
from app.utils.util import getToday
from app.model.issue import IssueModel, EngineerModel


def doSaveAccessToken(program_id, access_token):
    wxSysModel = WxSysMondel()
    wxsys = wxSysModel.findById(program_id=program_id)
    if None != wxsys:
        wxsys['access_token'] = access_token
    try:
        wxSysModel.update(wxsys=wxsys)
        return "success"
    except:
        return "failure"

def getAnnouncement(program_id):
    wxSysModel = WxSysMondel()
    wxsys = wxSysModel.findById(program_id=program_id)
    message = ''
    if None != wxsys:
        message = wxsys['program_message']
    return message

def getProgramList():
    wxSysModel = WxSysMondel()
    programs = wxSysModel.finds()
    programList = []
    for program in programs:
        program.pop('_id')
        programList.append(program)
    return programList

def updateProgram(program):
    wxSysModel = WxSysMondel()
    program_id = program.pop('program_id')
    wxsys = wxSysModel.findById(program_id=program_id)
    for key in program:
        wxsys[key] = program[key]
    wxSysModel.update(wxsys=wxsys)

def addProgram(wxsys):
    wxSysModel = WxSysMondel()
    wxSysModel.insert(wxsys=wxsys)

def doDeleteProgram(program_id):
    wxSysModel = WxSysMondel()
    wxSysModel.delete(program_id=program_id)
    return

def getLicenseList():
    licenseList = []
    wxSysLicenseMondel = WxSysLicenseMondel()
    wxSysModel = WxSysMondel()
    licenses = wxSysLicenseMondel.finds()
    for license in licenses:
        license.pop('_id')
        program_id = license['program_id']
        #print(program_id)
        wxSys = wxSysModel.findById(program_id=program_id)
        if None != wxSys:
            license['program_name'] = wxSys['program_name']
        licenseList.append(license)
    return licenseList

def addLicense(license):
    wxSysLicenseMondel = WxSysLicenseMondel()
    wxSysLicenseMondel.updateLicense(wxsyslicense=license)

def deleteLicense(license_num):
    wxSysLicenseMondel = WxSysLicenseMondel()
    wxSysLicenseMondel.delete(license_num=license_num)

def updateLicense(license):
    wxSysLicenseMondel = WxSysLicenseMondel()
    tmp = wxSysLicenseMondel.findById(license_num=license['license_num'])
    tmp['license_period'] = license['license_period']
    wxSysLicenseMondel.updateLicense(tmp)

def getLicense(license_num):
    wxSysLicenseMondel = WxSysLicenseMondel()
    license = wxSysLicenseMondel.findById(license_num=license_num)
    if None != license:
        license.pop('_id')
        program_id = license['program_id']
        wxSysModel = WxSysMondel()
        wxSys = wxSysModel.findById(program_id=program_id)
        if None != wxSys:
            license['program_name'] = wxSys['program_name']
        return license

def checkLicense(license_num):
    license = getLicense(license_num=license_num)
    if None == license:
        return False
    else:
        today = getToday()
        license_end_date = license['license_end_date']
        if license_end_date > today:
            return True
        else:
            return False

def removeData(program_id):
    if program_id == 'flowplus':
        issueModel = IssueModel()
        issueModel.removeAll()
        engineerModel = EngineerModel()
        engineerModel.removeAll()