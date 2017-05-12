from app.model.attendee import AttendeeModel
from app.model.party import PartyModel

#报名参加活动
def doAttendParty(attendee):
    party_id = attendee['party_id']
    partyModel = PartyModel()
    party = partyModel.find(party_id=party_id)
    party_attend_num = party['party_attend_num']
    party_total_num = party['party_total_num']
    if party_attend_num < party_total_num:
        party_attend_num = party_attend_num + 1
        party['party_attend_num'] = party_attend_num
        partyModel.update(party=party)
        attendeeModel = AttendeeModel()
        attendeeModel.insert(attendee=attendee)
    return party_id

#取消报名
def cancelAttendPary(attend_id):
    attendeeModel = AttendeeModel()
    attendee = attendeeModel.findByAttendeeId(attend_id=attend_id)
    attendee['attend_status'] = '0'
    attendeeModel.update(attendee=attendee)
    party_id = attendee['party_id']
    partyModel = PartyModel()
    party = partyModel.find(party_id=party_id)
    party_attend_num = party['party_attend_num'] - 1
    party['party_attend_num'] = party_attend_num
    partyModel.update(party=party)

#隐藏活动
def hiddenAttendPary(attend_id):
    attendeeModel = AttendeeModel()
    attendee = attendeeModel.findByAttendeeId(attend_id=attend_id)
    attendee['attend_status'] = '8'
    attendeeModel.update(attendee=attendee)
