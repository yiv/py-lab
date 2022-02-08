
# 3.10 开始支持 match
status = 400
match status:
    case 400:
        print('case 400')
    case _:
        print('case _')