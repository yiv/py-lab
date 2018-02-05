import os
import cv2 as cv
import numpy as np
import time
import random
from matplotlib import pyplot as plt

img = cv.imread("0.png")

w, h, c = img.shape

img[0, 0] = [255, 255, 255]


print("width = {}, height = {}".format(w, h))

y = 0
while y < h:
    x = 0
    while x < w:
        img[x, y] = [0, 0, 0]
        x += 1
    y += 1

cv.imshow("img", img)
cv.waitKey(0)
