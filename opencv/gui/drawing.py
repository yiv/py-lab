import numpy as np
import cv2 as cv

img = np.zeros((512, 512, 3), np.uint8)

cv.line(img, (0, 0), (511, 511), (255, 0, 0), 5, cv.LINE_4)

cv.rectangle(img, (384, 0), (510, 128), (0, 255, 0), 3)

pts = np.array([[10, 5], [20, 30], [70, 20], [50, 10]], np.int32)
pts = pts.reshape((-1, 1, 2))
cv.polylines(img, [pts], True, (0, 255, 255))

cv.imshow('image', img)
cv.waitKey(0)
cv.destroyAllWindows()
