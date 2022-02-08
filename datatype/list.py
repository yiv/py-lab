ary = [0, 1, 2, 3, 4]
arySlice = ary[1:3]

print(ary)

ary[0] = 10
print('列表素材可变', ary)

print('列表切片(是副本)', arySlice)
arySlice[0] = 500
print('变更切片单个元素不会修改原列表', ary, arySlice)

ary[1:3] = [800, 900]
print('列表成段赋值', ary)
ary[1:3] = []
print('列表值清空', ary)

print('列表合并', [0, 1, 2] + [4, 5, 6])

prev = [0, 1, 2]
prev.append(3)
print('列表追加单个', prev)
prev.extend((4, 5, 6))
prev.extend([7, 8, 9])
print('列表追加多个', prev)

ary1, ary2 = [1, 2, 3], [11, 22, 33]
print('嵌套列表（多维数组）', [ary1, ary2])
