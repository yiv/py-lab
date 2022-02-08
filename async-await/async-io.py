import asyncio
import time


async def sleep():
    await asyncio.sleep(1)
    print('sleep 1 seconds')


async def task(task_id, sleep):
    await asyncio.sleep(sleep)
    print(task_id, 'finished')


async def concurrency():
    print(time.strftime('%X'))
    task1 = asyncio.create_task(task(1, 2))
    task2 = asyncio.create_task(task(2, 5))
    await task1
    await task2
    print(time.strftime('%X'))

asyncio.run(concurrency())
