from app.model.attendee import AttendeeModel
from app.model.party import PartyModel


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