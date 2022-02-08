def say_hello():
    print("hello world")


def parm(a=99, b="def"):
    print(a, b)


def list_param(a, l=[]):
    l.append(a)
    return l


def none_list_param(a, l=None):
    if l is None:
        l = []
    l.append(a)
    return l


def keyword_param(a=500, b=600):
    print(a, b)

def multiple_param(a=500, b=600, *args):
    print(a, b, args)



multiple_param(5,6,'1a','2a')

# keyword_param(b=700)
# keyword_param(b=700, a=300)

# parm(50, "hah")
# parm(50)


# print('list 作为函数参数时值会被修改')
# print(list_param(1))
# print(list_param(2))

# print('list 作为函数参数时值会被修改，用 none 为默认值')
# print(none_list_param(1))
# print(none_list_param(2))
