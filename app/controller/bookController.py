from app.model.book import ServiceModel, DoctorModel
import json
from app.utils.util import getToday, addDays


def insertService(service):
    res = {}
    serviceModel = ServiceModel()
    res = serviceModel.insert(service=service)
    if None != res:
        res.pop('_id')
    else:
        res = {}
    return res

def serviceList(license_num):
    res = []
    serviceModel = ServiceModel()
    services = serviceModel.finds(license_num=license_num)
    for service in services:
        service.pop('_id')
        res.append(service)
    return res

def insertDoctor(doctor):
    res = {}
    doctorModel = DoctorModel()
    res = doctorModel.insert(doctor=doctor)
    if None != res:
        res.pop('_id')
    else:
        res = {}
    return res

def doctorList(license_num):
    res = []
    doctorModel = DoctorModel()
    doctors = doctorModel.finds(license_num=license_num)
    for doctor in doctors:
        doctor.pop('_id')
        service_ids = json.loads(doctor['services'])
        serviceModel = ServiceModel()
        doctor_services = []
        doctor_services_name = ''
        for service_id in service_ids:
            service = serviceModel.findById(service_id=service_id)
            if None != service:
                service.pop('_id')
                doctor_services.append(service)
                doctor_services_name = doctor_services_name + service['service_name'] + '\n'
        doctor['doctor_services'] = doctor_services
        doctor['doctor_services_name'] = doctor_services_name

        res.append(doctor)
    return res

def getDays():
    days = []
    today = getToday()
    days.append(today)
    for i in range(1, 7):
        days.append(addDays(today, i))

    return days


