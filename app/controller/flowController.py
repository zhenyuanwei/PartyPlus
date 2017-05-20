from app.model.issue import IssueModel

def getIssueList(request_openId):
    issueModel = IssueModel()
    issueList = []
    issues = issueModel.findByOpenId(request_openId=request_openId)
    for issue in issues:
        issue.pop('_id')
        issueList.append(issue)
    return issueList