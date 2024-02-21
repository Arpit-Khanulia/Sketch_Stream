import express from 'express'
import router from './Routes/routes';
import {createServer} from 'http'
import {Server} from 'socket.io'
import cors from 'cors'


const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
        credentials:true,
        methods:["GET","POSt"]
    }
});


app.use(cors({
    origin:'*'
}));

app.use('/',router);


interface userdataType{

    name:string,
    uid:string,
    roomid:string
}

let userdata:userdataType;

interface messageType{
    chat:string,
    name:string,
    uid:string
}


io.on('connection',(socket)=>{
    console.log('User Connected');
    console.log('ID',socket.id);

    socket.emit('welcome',` hey! welcome to the server ${socket.id}`)

    socket.on('userJoined',(data)=>{
        userdata = data;
        console.log(`${data.name} has joined with room id ${data.roomid} and user id ${data.uid}`);
        socket.join(data.roomid);

        socket.on('chatmessage',(message:messageType)=>{

            console.log('message aaya ',message);
            
            socket.broadcast.to(data.roomid).emit("chatbackend",message)
        })
    })
})


server.listen(3000,()=>console.log('server listening at port 3000'))