from urllib import request, parse


def get_test():
    res = request.urlopen('http://localhost:8080')
    body = res.read()
    print('ee', body)


get_test()
