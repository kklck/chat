const express = require("express");// express 라이브러리를 변수에 담기, require은 modules 자동 탐색
const http = require("http");
const app = express();
const path = require("path");// 서버 경로??
const server = http.createServer(app); // app이 http 통해 실행될 수 있도록
const socketIO = require("socket.io")
const moment = require("moment");

const io = socketIO(server);

app.use(express.static(path.join(__dirname,"src")))

const PORT = process.env.PORT || 5000;

io.on("connection", (socket)=>{
    socket.on("chatting", (data)=>{
        const {name, msg } = data;
        io.emit("chatting",{
            name,
            msg,
            time : moment(new Date()).format("h:mm A")
        })

    })
})

server.listen(PORT, ()=>console.log(`server is running ${PORT}`))