import os
import cv2 as cv
import numpy as np
import time
import random
from matplotlib import pyplot as plt

img_rgb = cv.imread('%s.png' % 0, 0)

tempPlayer = cv.imread('temp_player.jpg', 0)
tempPlayerMatch = cv.matchTemplate(img_rgb, tempPlayer, cv.TM_CCOEFF_NORMED)
min_val, max_val, min_loc, max_loc = cv.minMaxLoc(tempPlayerMatch)

img_rgb = cv.GaussianBlur(img_rgb, (5, 5), 0)
canny_img = cv.Canny(img_rgb, 1, 10)

# 消去小跳棋轮廓对边缘检测结果的干扰
for k in range(max_loc[1] - 10, max_loc[1] + 189):
    for b in range(max_loc[0] - 10, max_loc[0] + 100):
        canny_img[k][b] = 0


def get_center(img_canny, ):
    # 利用边缘检测的结果寻找物块的上沿和下沿
    # 进而计算物块的中心点
    y_top = np.nonzero([max(row) for row in img_canny[400:]])[0][0] + 400
    x_top = int(np.mean(np.nonzero(canny_img[y_top])))

    y_bottom = y_top + 50
    for row in range(y_bottom, H):
        if canny_img[row, x_top] != 0:
            y_bottom = row
            break

    x_center, y_center = x_top, (y_top + y_bottom) // 2
    return img_canny, x_center, y_center


plt.imshow(canny_img, cmap='gray', interpolation='bicubic')
plt.show()
