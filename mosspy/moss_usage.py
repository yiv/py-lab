import mosspy

userid = 263495301

m = mosspy.Moss(userid, "javascript")

# m.addBaseFile("submission/a01.py")
# m.addBaseFile("submission/test_student.py")

# Submission Files
# m.addFile("compare/ss.js")
# m.addFile("compare/xc.js")



m.addFile("compare3/xiaoao.js")
# m.addFile("compare/t3xx.js")
m.addFilesByWildcard("compare3/*.js")


url = m.send()

print("Report URL: " + url)

# Save report file
m.saveWebPage(url, "submission/report.html")

mosspy.download_report(url, "submission/report/", connections=8, log_level=10)  # logging.DEBUG (20 to disable)
