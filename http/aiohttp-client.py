import aiohttp
import asyncio


async def get(client):
    async with client.get('http://python.org') as resp:
        assert resp.status == 200
        return await resp.text()


async def main():
    async with aiohttp.ClientSession() as client:
        html = await get(client)
        print(html)


asyncio.run(main())
