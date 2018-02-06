import numpy as np
import cv2 as cv

img = cv.imread('messi5.jpg')
px = img[100, 100]
print(px)

blue = img[100, 100, 0]
print(blue)

cv.imshow("test", img)

print(img.item(2, 2, 0))
img.itemset((2, 2, 0), 99)
print(img.item(2, 2, 0))

cv.imshow("test", img)

b, g, r = cv.split(img)
cv.imshow("test", r)
cv.waitKey(0)
cv.destroyAllWindows()
