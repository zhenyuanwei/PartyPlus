from app.model.issue import IssueModel, EngineerModel

def getIssueList(request_openId):
    issueModel = IssueModel()
    issueList = []
    issues = issueModel.findByOpenId(request_openId=request_openId)
    for issue in issues:
        issue.pop('_id')
        issueList.append(issue)
    return issueList

def saveIssue(issue):
    issueModel = IssueModel()
    issue_id = issueModel.insert(issue)
    return issue_id

def getIssue(issue_id):
    issueModel = IssueModel()
    issue = issueModel.findByIssueId(issue_id=issue_id)
    if None != issue:
        issue.pop('_id')
    else:
        issue = {}
    return issue

def addEngineer(engineer):
    engineerModel = EngineerModel()
    engineer_id = engineerModel.insert(engineer)
    return engineer_id

def getEngineer(engineer_id):
    engineerModel = EngineerModel()
    engineer = engineerModel.findByEngineerId(engineer_id)
    if None != engineer:
        engineer.pop('_id')
    else:
        engineer = {}
    return engineer

def getEngineerList(license_num):
    engineerList = []
    engineerModel = EngineerModel()
    engineers = engineerModel.finds(license_num)
    if None != engineers:
        for engineer in engineers:
            engineer.pop('_id')
            engineerList.append(engineer)
    return engineerList

def setEngineerWX(engineer):
    engineerModel = EngineerModel()
    engineer = engineerModel.update(engineer)
    return engineer['license_num']

def getCompanyIssueList(openId):
    engineerModel = EngineerModel()
    engineer = engineerModel.findByOpenId(openId=openId)
    license_num = engineer['license_num']
    issueModel = IssueModel()
    issueList = []
    issues = issueModel.findByLicense(license_num=license_num)
    for issue in issues:
        issue.pop('_id')
        issueList.append(issue)

    return issueList

def updateIssueLogs(issue):
    openId = issue['logs']['openId']
    engineerModel = EngineerModel()
    engineer = engineerModel.findByOpenId(openId=openId)
    type = engineer['type']

    message = {}
    issueModel = IssueModel()
    issueTo = issueModel.findByIssueId(issue_id=issue['issue_id'])
    logsCount = len(issueTo['logs'])
    issueTo['logs'].append(issue['logs'])
    issueModel.update(issueTo)

    if type == '01':
        #调度员的处理，这里返回发起报修人的openId
        message['openId'] = issueTo['request_openId']
        message['template_id'] = 'RF297PVp7x-7akn5YkX-jdOFY4bFVvMU_eXDx9tp0CI'
        if logsCount == 1 :
            message['message'] = '您的报修已经收到，并安排工程师进行问题排查。'
        else :
            message['message'] = '您的报修已经处理完成，请确认处理结果。'
    else :
        #查找调度员的openId
        license_num = issueTo['license_num']
        engineer = engineerModel.findFocalByLicense(license_num=license_num)
        message['openId'] = engineer['openId']
        message['template_id'] = 'RF297PVp7x-7akn5YkX-jdOFY4bFVvMU_eXDx9tp0CI'
        message['message'] = '报修已经处理，处理方式：' + issue['logs']['description']

    return message