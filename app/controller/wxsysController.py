from app.model.wxsys import WxSysMondel
def doSaveAccessToken(program_id, access_token):
    wxSysModel = WxSysMondel()
    wxsys = wxSysModel.findById(program_id=program_id)
    wxsys['access_token'] = access_token
    try :
        wxSysModel.update(wxsys=wxsys)
        return "success"
    except :
        return "failure"