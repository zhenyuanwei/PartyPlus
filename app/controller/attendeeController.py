from app.model.attendee import AttendeeModel


def doAttendParty(attendee):
    attendeeModel = AttendeeModel()
    attendeeModel.insert(attendee=attendee)
    return attendee['party_id']