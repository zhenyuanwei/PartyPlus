from app.model.wxsys import WxSysMondel


def doSaveAccessToken(program_id, access_token):
    wxSysModel = WxSysMondel()
    wxsys = wxSysModel.findById(program_id=program_id)
    wxsys['access_token'] = access_token
    try:
        wxSysModel.update(wxsys=wxsys)
        return "success"
    except:
        return "failure"

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
