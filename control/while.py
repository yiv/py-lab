number = 23
running = True

while running:
    guess = int(input('Enter an integer : '))
    if guess == number:
        running = False
    elif guess > number:
        print("a little big")
    else:
        print("a little small")
else:
    print("bingo")

while True:
    s = input("type something: ")
    if s == "quit":
        break
print("done")
