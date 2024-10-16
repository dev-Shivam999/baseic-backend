import WebSocket ,{WebSocketServer} from "ws";
import http from "http";
const server=http.createServer((req, res) =>{
    res.end("hiiii")
})

const wss = new WebSocketServer({server})
wss.on("connection",function connection(ws){
    ws.on("error",console.error)
    ws.on('message',function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        })
    })
    ws.send('Hello from WebSocket')
})

server.listen(3000,()=>{
    console.log("adnvo;lskdn kv dv d vs")
    
})