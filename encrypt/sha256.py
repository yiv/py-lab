

import hashlib

def str_bytes_digest_hex():
    """
    将originStr转化为UTF-8的byte数组后，使用sha256算法进行编码，再将编码后的数组转码为16进制的字符串。
    拼接的字符串：asynNotifyUrl=http://www.google.com&attach=merhcant-attach&email=retertw@gmail.com&firstName=Test&merchantId=10134583556392&merchantOrderNo=lllllwer2323333rwere1&orderAmount=10.22&orderName=test&payCoinType=1&phone=7979797901&productInfo=lucky-test&syncReturnUrl=http://www.google.com&tradeOrderTime=1624873289000&userId=02323423&secretKey=0b6781a9d40e4b52abbd8c7f19469e5e
    签名后的字符串：93d80683b26c4e387f60563e9fa7baac38c340afabe32cc3c4a2cf0d3077312d
    """
    my_str = 'asynNotifyUrl=http://www.google.com&attach=merhcant-attach&email=retertw@gmail.com&firstName=Test&merchantId=10134583556392&merchantOrderNo=lllllwer2323333rwere1&orderAmount=10.22&orderName=test&payCoinType=1&phone=7979797901&productInfo=lucky-test&syncReturnUrl=http://www.google.com&tradeOrderTime=1624873289000&userId=02323423&secretKey=0b6781a9d40e4b52abbd8c7f19469e5e'
    byte_ary = str.encode(my_str)

    m = hashlib.sha256()
    m.update(byte_ary)
    m.digest()

    digest = m.digest()
    print(digest.hex())


str_bytes_digest_hex()
