import numpy as np
import cv2 as cv


# events = [i for i in dir(cv) if 'EVENT' in i]
# print(events)


# mouse callback function
def draw_circle(event, x, y, flags, param):
    if event == cv.EVENT_LBUTTONDBLCLK:
        cv.circle(img, (x, y), 100, (255, 0, 0), -1)
        print("{0},{1}".format(x, y))


def print_log(event, x, y, flags, param):
    print("hello")
    print("{0},{1}".format(x, y))


# Create a black image, a window and bind the function to window
img = np.zeros((512, 512, 3), np.uint8)

cv.namedWindow('image')
cv.setMouseCallback('image', draw_circle)
while (1):
    cv.imshow('image', img)
    if cv.waitKey(20) & 0xFF == 27:
        break
cv.destroyAllWindows()
