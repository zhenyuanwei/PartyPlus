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
    engineerModel.removeAll()
    engineers = engineerModel.finds(license_num)
    for engineer in engineers:
        engineer.pop('_id')
        engineerList.append(engineer)
    return engineerList