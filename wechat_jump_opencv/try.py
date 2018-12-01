import cv2 as cv
import time
import os


def get_screenshot(id=0):
    os.system('adb shell screencap -p /sdcard/%s.png' % str(id))
    os.system('adb pull /sdcard/%s.png ./screen/' % str(id))


def jump(distance, x1=700, y1=1200, x2=710, y2=1270):
    # 这个参数还需要针对屏幕分辨率进行优化
    press_time = int(distance * 2.05)
    cmd = ('adb shell input swipe %i %i %i %i ' + str(press_time)) \
          % (x1, y1, x2, y2)
    os.system(cmd)
    print(cmd)


def jumpOnce():
    get_screenshot(0)
    img_rgb = cv.imread('%s.png' % 0, 0)

    cv.imshow('image', img_rgb)

def templateGameOverMatch(id=0):
    img_rgb = cv.imread('./screen/%s.png' % id, 0)
    img_rgb = cv.GaussianBlur(img_rgb, (5, 5), 0)
    canny_img = cv.Canny(img_rgb, 1, 10)

    tempOver = cv.imread('./tmp/temp_over.jpg', 0)
    match = cv.matchTemplate(canny_img, tempOver, cv.TM_SQDIFF_NORMED)
    min_val1, max_val1, min_loc1, max_loc1 = cv.minMaxLoc(match)

    print("templateGameOverMatch: min_val = {}, max_val = {}, min_loc = {}, max_loc = {},".format(min_val1, max_val1, min_loc1, max_loc1))

    if min_val1 == 1.0 and max_val1 == 1.0 :
        return False
    else:
        return True

def templateMatchPlayer(id=0):
    tempPlayer = cv.imread('./tmp/temp_player.jpg', 0)
    tempPlayeW, tempPlayerH = tempPlayer.shape[::-1]
    img_rgb = cv.imread('./screen/%s.png' % id, 0)

    match = cv.matchTemplate(img_rgb, tempPlayer, cv.TM_SQDIFF)
    min_val1, max_val1, min_loc1, max_loc1 = cv.minMaxLoc(match)

    top_left = min_loc1
    bottom_right = (top_left[0] + tempPlayeW, top_left[1] + tempPlayerH)
    top_center = (top_left[0] + int(tempPlayeW / 2), top_left[1])
    boottom_center = (bottom_right[0] - int(tempPlayeW / 2), bottom_right[1])

    cv.rectangle(img_rgb, top_left, bottom_right, 255, 2)
    cv.circle(img_rgb, top_center, 2, (0, 0, 255), -1)
    cv.circle(img_rgb, boottom_center, 2, (0, 0, 255), -1)

    cv.imwrite('./screen/player_%s.png' % id, img_rgb)

    # plt.imshow(img_rgb, cmap='gray', interpolation='bicubic')
    # plt.show()

    return boottom_center



def templateBlackCircleMatch(id=0):
    img_rgb = cv.imread('./screen/%s.png' % id, 0)
    img_rgb = cv.GaussianBlur(img_rgb, (5, 5), 0)
    canny_img = cv.Canny(img_rgb, 1, 10)

    tempBlackCircle = cv.imread('./tmp/temp_black_circle.jpg', 0)
    BlackCircleW, BlackCircleH = tempBlackCircle.shape[::-1]

    match = cv.matchTemplate(canny_img, tempBlackCircle, cv.TM_SQDIFF_NORMED)
    min_val1, max_val1, min_loc1, max_loc1 = cv.minMaxLoc(match)

    if min_val1 == 1.0 and max_val1 == 1.0 :
        return False

    print("templateBlackCircleMatch: min_val = {}, max_val = {}, min_loc = {}, max_loc = {},".format(min_val1, max_val1, min_loc1, max_loc1))

    top_left = min_loc1
    bottom_right = (top_left[0] + BlackCircleW, top_left[1] + BlackCircleH)
    circle_center = (top_left[0] + int(BlackCircleW / 2), top_left[1] + int(BlackCircleH / 2))

    cv.rectangle(canny_img, top_left, bottom_right, 255, 2)
    cv.circle(canny_img, circle_center, 2, (0, 0, 255), -1)

    cv.imwrite('./screen/black_%s.png' % id, canny_img)

    # plt.imshow(canny_img, cmap='gray', interpolation='bicubic')
    # plt.show()

    return circle_center





def isTargetOnLeft(playerLoc, targetLoc):
    if (playerLoc[0] > targetLoc[0]):
        return True
    return False


def getJumpDistance(playerLoc, targetLoc):
    distance = (playerLoc[0] - targetLoc[0]) ** 2 + (playerLoc[1] - targetLoc[1]) ** 2
    distance = distance ** 0.5
    return int(distance)


def firstJump():
    jump(350)
    time.sleep(1)

def clear_img(img, rows, cols):
    y = 0
    while y < rows:
        x = 0
        while x < cols:
            img[y, x] = 0
            x += 1
        y += 1
    return img


def top_edge_detect(img):
    ys = 0
    xs = []
    xs_sum = 0
    rows, cols = img.shape
    print("top_detect: rows = {}, cols = {}".format(rows, cols))
    for y in range(rows):
        for x in range(cols):
            if img[y, x] != 0:
                ys = y
                xs.append(x)
                # print("top_detect: {}".format(img[y, x]))
        if ys > 0:
            print("top_detect: xs = {}, ys = {}".format(xs, ys))
            for z in xs:
                xs_sum += z
            return ys, int(xs_sum / len(xs))


def bottom_edge_detect(img, row, col):
    rows, cols = img.shape
    for r in range(rows):
        if r < row + 50:
            continue
        for c in range(cols):
            if c == col and img[r, col] != 0:
                return r, c


def draw_circle(img, x, y):
    cv.circle(img, (x, y), 3, (255, 255, 255), -1)


def edge_detect(id = 0):
    playerImg = cv.imread('./tmp/temp_player.jpg')
    playImg = cv.imread('./screen/%s.png' % id)
    rows, cols, channels = playImg.shape
    print("cols = {}, rows ={}, channels = {}".format(rows, cols, channels))
    playImg = cv.Canny(playImg, 1, 10)
    playImg = clear_img(playImg, rows / 3, cols)

    top_row, top_col = top_edge_detect(playImg)
    # print("top row = {}, col ={}".format(row, col))
    # draw_circle(playImg, col, row)
    bottom_row, col = bottom_edge_detect(playImg, top_row, top_col)
    # print("top row = {}, col ={}".format(row, col))
    x = top_col 
    y = int((bottom_row - top_row) / 2 + top_row)
    draw_circle(playImg, top_col, y)

    cv.imwrite('./screen/edge_%s.png' % id, playImg)

    return (x,y)

    # cv.imshow("img", playImg)
    # cv.waitKey(0)







firstJump()

for i in range(200):

    get_screenshot(i)
    if templateGameOverMatch(i) == True :
        print("GameOver! i = {}".format(i))
        break

    

    print("{}================================".format(i))
    

    playerLoc = templateMatchPlayer(i)
    # targetLoc = templateWhiteCircleMatch()
    targetLoc = templateBlackCircleMatch(i)
    if targetLoc == False :
        print("Black Circle Match Failed")
        targetLoc = edge_detect(i)
        # break

    if (isTargetOnLeft(playerLoc, targetLoc) == True):
        direction = "left"
        finalPlayerLoc = (playerLoc[0] - 20, playerLoc[1] - 10)
        distance = getJumpDistance(finalPlayerLoc, targetLoc)
    else:
        direction = "right"
        finalPlayerLoc = playerLoc
        distance = getJumpDistance(finalPlayerLoc, targetLoc)

    distance = getJumpDistance(playerLoc, targetLoc)

    jump(distance, playerLoc[0], playerLoc[1], targetLoc[0], targetLoc[1])

    print("direction: {}".format(direction))
    print("player   : {}".format(playerLoc))
    print("final    : {}".format(finalPlayerLoc))
    print("box      : {}".format(targetLoc))
    print("distance : {}".format(distance))

    time.sleep(1)
