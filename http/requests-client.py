import requests

create_order_req = {
    "merchantId": 10134583556392,
    "userId": "02323423",
    "merchantOrderNo": "lllllwer2323333rwere1",
    "orderAmount": "10.22",
    "orderName": "test",
    "payCoinType": "1",
    "productInfo": "lucky-test",
    "tradeOrderTime": 1624873289000,
    "attach": "merhcant-attach",
    "syncReturnUrl": "http://www.google.com",
    "asynNotifyUrl": "http://www.google.com",
    "firstName": "Test",
    "email": "retertw@gmail.com",
    "phone": "7979797901"
}


def queries_to_sort_kv(req, secret_key):
    sorted_keys = sorted(req)
    sort_kv = ''
    for key in sorted_keys:
        sort_kv += key + '=' + str(req[key]) + '&'
    sort_kv += 'secretKey' + '=' + secret_key
    return sort_kv


def http_get():
    res = requests.get('http://localhost:8080')
    print(res.text)


def http_post_form():
    form = {'key1': 'value1', 'key2': 'value2'}
    res = requests.post('http://localhost:8080/form', data=form)
    print(res.text)


def http_post_json():
    obj = {'key1': 'value1', 'key2': 'value2'}
    res = requests.post('http://localhost:8080/json', json=obj)
    print(res.text)


if __name__ == '__main__':
    # print(queries_to_sort_kv(create_order_req, 'xxxxxx'))
    # print(http_get())
    # http_post_form()
    http_post_json()
