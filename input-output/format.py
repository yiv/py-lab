import math

name = 'edwin'
age = 5

print('使用前缀 "f 和 {}" 格式化字符串', f'This is {name}, he is {age} years old')
print('使用 "str.format()" 格式化字符串', 'This is {}, he is {} years old'.format(name, age))

print('设置小占位字符', f'#{name:8}#{age:8}#')
print('小数有效位', f'{math.pi: .3f}', f'{math.pi:.4f}')