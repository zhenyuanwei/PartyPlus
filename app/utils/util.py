import time


def getTimeStamp():
    return str(int(time.time()))

def getTime():
    value = ''
    now = int(time.time())
    localtime = time.localtime(now)
    value = time.strftime('%Y-%m-%d %H:%M:%S', localtime)
    return value

#print(getTimeStamp())
#print(getTime())