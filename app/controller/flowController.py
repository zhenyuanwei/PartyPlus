from app.model.issue import IssueModel

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