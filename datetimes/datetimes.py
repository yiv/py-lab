import datetime
import time


def unix_time():
    now = datetime.datetime.now()
    print(now)

    unix_seconds = time.mktime(now.timetuple())
    print(unix_seconds)

    print(time.time(), int(time.time()), int(time.time() * 1000))
