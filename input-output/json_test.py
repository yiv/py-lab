import json

obj = {'name': 'edwin', 'gender': False, 'age': 15}


def json_stringify():
    print(json.dumps(obj))


def json_parse():
    x = '{"name": "edwin", "gender": false, "age": 15}'
    o = json.loads(x)
    print(o)


if __name__ == '__main__':
    json_stringify()
    json_parse()
