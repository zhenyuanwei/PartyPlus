from app.model.party import PartyModel
from app.model.attendee import AttendeeModel


def getOwnPartyList(openId):
    res = []
    partyModel = PartyModel()
    if None == openId:
        partys = partyModel.find()
    else :
        partys = partyModel.findByOpenId(open_id=openId)

    for party in partys:
        party.pop('_id')
        res.append(party)
    return res

def getPartyInfos(party_id, attendee_openid):
    partyModel = PartyModel()
    party = partyModel.find(party_id=party_id)
    party.pop('_id')
    res = party
    attendeeList = []
    attendeeModel = AttendeeModel()
    attendees = attendeeModel.findByParty(party_id=party_id)
    for attendee in attendees:
        attendee.pop('_id')
        if None == attendee_openid:
            attendeeList.append(attendee)
        else :
            if attendee['attendee_openid'] == attendee_openid:
                attendeeList.append(attendee)
                break

    res['attendeeList'] = attendeeList

    return res

def getAttendedPartyList(open_id):
    res = []
    attendeeModel = AttendeeModel()
    myAttendList = attendeeModel.findByOpenId(open_id=open_id)
    partyModel = PartyModel()
    for myAttend in myAttendList:
        party_id = myAttend['party_id']
        party = partyModel.finds(party_id=party_id)
        party.pop('_id')
        res.append(party)
    return res

def createPartyEntry(party):
    partyModel = PartyModel()
    party_id = partyModel.insert(party=party)
    return party_id
