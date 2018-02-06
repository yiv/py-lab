def say_hello():
    print("hello world")


def parm(a=99, b="def"):
    print("a = {}".format(a))
    print("b = {}".format(b))


print("================")

parm(50, "hah")
print("================")
parm(50)
print("================")
parm("xx")
print("================")
parm(a=10, b="xx")
