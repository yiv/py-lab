book = {'padme': 35, 'edwin': 34}
print(book)
book['nick'] = 33
print('增', book)
book['edwin'] = 50
print('改', book)
print('查', book['padme'])

print('键列表', list(book))


print('键列表（排序）', sorted(book))


