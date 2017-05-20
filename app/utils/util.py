import time
from datetime import timedelta
from datetime import datetime


def getTimeStamp():
    return str(int(time.time()))

def getTime():
    now = int(time.time())
    localtime = time.localtime(now)
    value = time.strftime('%Y-%m-%d %H:%M:%S', localtime)
    return value

def getToday():
    now = int(time.time())
    localtime = time.localtime(now)
    value = time.strftime('%Y-%m-%d', localtime)
    return value

def addDays(current_day, days):
    date = datetime.strptime(current_day, '%Y-%m-%d')
    newDate = date + timedelta(days=days)
    return newDate.strftime('%Y-%m-%d')

#print(getTimeStamp())
#print(getTime())
#now = getToday()
#new = addDays(now, 30)
#print(new)