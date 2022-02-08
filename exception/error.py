

try:
    raise 'some thing wrong'
except ValueError:
    print('出错')

print('异常后仍能运行')