# examples/server_simple.py
from aiohttp import web


async def handle(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)


async def form_handle(request):
    req = await request.post()
    print(req['key1'])
    res = {'edwin': 15}
    return web.json_response(res)


async def json_handle(request):
    req = await request.json()
    print(req)
    res = {'edwin': 15}
    return web.json_response(res)


async def wshandle(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == web.WSMsgType.text:
            await ws.send_str("Hello, {}".format(msg.data))
        elif msg.type == web.WSMsgType.binary:
            await ws.send_bytes(msg.data)
        elif msg.type == web.WSMsgType.close:
            break

    return ws


app = web.Application()
app.add_routes([web.get('/', handle),
                web.get('/echo', wshandle),
                web.post('/form', form_handle),
                web.post('/json', json_handle),
                web.get('/{name}', handle)])

if __name__ == '__main__':
    web.run_app(app)
