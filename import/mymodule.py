import sys


def say():
    print("hahahahahah", __name__)
    # print(sys.path)

key = 'edwin'

print('mymodule', __name__)

__version__ = '0.0.1'


if __name__ == '__main__':
    print('当前代码以脚本方式执行')
else:
    print('当前代码以 module 方式执行')


