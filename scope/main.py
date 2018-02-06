# 1、块级作用域

# if 1 == 1:
#     name = "lzl"
#
# print(name)
#
# for i in range(10):
#     age = i
#
# print(age)

# 代码执行成功，没有问题；在C中，执行上面的代码会提示name，age没有定义，而在Python中可以执行成功，这是因为在Python中是没有块级作用域的，代码块里的变量，外部可以调用，所以可运行成功；


# 2. 局部作用域

# def func():
#     name = "lzl"
# print(name)

# Python中没有块级作用域，但是有局部作用域

# 3. 作用域链

#
# name = "lzl"
#
#
# def f1():
#     name = "Eric"
#
#     def f2():
#         name = "Snor"
#         print(name)
#
#     f2()
#
#
# f1()

# 4、终极版作用域

# name = "lzl"
#
# def f1():
#     print(name)
#
# def f2():
#     name = "eric"
#     f1()
#
# f2()

def scop():
    col = 0
    for i in range(10):
        for j in range(5):
            col = i
    print(col)

