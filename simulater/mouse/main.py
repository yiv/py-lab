import mouse
import time

i = 0
while (i < 10):
    mouse.press(button='left')
    time.sleep(3)
    mouse.release(button='left')

    print("click")
    i += 1
