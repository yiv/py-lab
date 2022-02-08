print('单引号')
print("双引号")

print('单引号包"双引号"')
print("双引号包'单引号'")

print('转义\t字符')

print(r'raw string 去\t转义符')

print('''=======
跨行
字符
=====''')
print("""=======
跨行
字符
=====""")

print("字符串" + "拼接")

print("字符串重复 " * 3 + "再拼接")

text = ('自动拼接'
        '这一段')
print(text)

print('字符串索引'[1])
print('字符串反向索引'[-1])

text = '来个字符串切片示例'
print(text[1:], text[:2], text[1:2])
text = '倒数切片'
print(text[-2:])

text = '字符串是不可变变量'
# text[0] = '#'
print(text, len(text))
