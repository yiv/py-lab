import cv2 as cv


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


def edge_detect():
    playerImg = cv.imread('temp_player.jpg')
    playImg = cv.imread('j.png')
    rows, cols, channels = playImg.shape
    print("cols = {}, rows ={}, channels = {}".format(rows, cols, channels))
    playImg = cv.Canny(playImg, 1, 10)
    playImg = clear_img(playImg, rows / 3, cols)

    row, col = top_edge_detect(playImg)
    print("top row = {}, col ={}".format(row, col))
    draw_circle(playImg, col, row)
    row, col = bottom_edge_detect(playImg, row, col)
    print("top row = {}, col ={}".format(row, col))
    draw_circle(playImg, col, row)

    cv.imshow("img", playImg)
    cv.waitKey(0)


edge_detect()
