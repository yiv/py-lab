print('\nfor i in (1, 5)')
for i in (1, 5):
    print(i, end=' ')

print('\nfor i in [1, 5]')
for i in [1, 5]:
    print(i, end=' ')

print('\n遍历值：for i in {"1": 11, "2": 22}')
for val in {"1": 11, "2": 22}:
    print(val, end=' ')

print("\n同时遍历：for i, v in zip([1, 2, 3], ['a', 'b', 'c'])")
for left, right in zip([1, 2, 3], ['a', 'b', 'c']):
    print(left, right)

print('\n逆向遍历：for val in reversed([1, 2, 3])')
for val in reversed([1, 2, 3]):
    print(val, end=' ')

print('\n遍历键和值：for k,v in {"1": 11, "2": 22}')
for k, v in {"1": 11, "2": 22}.items():
    print(k, v)

print('\n遍历 list 的 index 和值：for i, v in enumerate([1, 2, 3])')
for i, v in enumerate([1, 2, 3]):
    print(i, v)

print('\n遍历且同时修改集合内容')
obj = {"1": 11, "2": 22}
for k, v in obj.items():
    obj[k] = v * 10
print(obj)

print('\n\n===== 使用 range ====')
print('range(10) 是一个迭代器', range(10))
print('list 可消费 range 迭代内容，把结果转为 list', list(range(10)))
print('sum 消费 range 迭代内容，把结果求和(0+1+2+3)', sum(range(4)))
print('range 起止', list(range(5, 10)))
print('range 起止，带步进', list(range(0, 10, 3)))

print('遍历 range for i in range(10)')
for i in range(10):
    print(i, end=' ')

print('\n\n===== 循环中使用 else ====')
for i in range(10):
    print(i, end=' ')
else:
    print('循环结束')

for i in range(10):
    if i == 5:
        print('提前结束')
        break
    else:
        print(i, end=' ')

for i in range(10):
    if i < 5:
        print('跳过', i, end=' ')
        continue
    else:
        print(i, end=' ')
