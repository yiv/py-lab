import os
import cv2 as cv
import numpy as np
import time
import random
from matplotlib import pyplot as plt

img = cv.imread("1.png")

w, h, c = img.shape

print("width = {}, height = {}".format(w, h))

y = 0
while y < h / 2:
    x = 0
    while x < w / 2:
        img[x, y] = [255, 255, 255]
        x += 1
    y += 1

cv.imshow("img", img)
cv.waitKey(0)
