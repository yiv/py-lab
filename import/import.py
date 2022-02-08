import builtins
import sys
import math
import numpy
import mymodule
from mymodule import say
from mymodule import say as hello
from package import package
from package.left import left




print('通过 module 名调用', mymodule.say())
print('通过 module 函数直接调用', say())
print('通过 module 函数别名调用', hello())

print('访问 module 全局变量', mymodule.key)
print('模块导入路径', sys.path)
# print('模块编译后的缓存', __pycache__)
print('模块定义符号列表', dir(mymodule))
print('内置模块的函数和变量列表', dir(builtins))

print('引用包', package.package_greet())
print('引用包内子包', left.left_greet())
