"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./Routes/routes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dirname = path_1.default.resolve();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POSt"]
    }
});
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use('/', routes_1.default);
app.use(express_1.default.static(path_1.default.join(dirname, "../Frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(dirname, "../Frontend/dist/index.html"));
});
let userdata;
io.on('connection', (socket) => {
    console.log('User Connected');
    console.log('ID', socket.id);
    socket.emit('welcome', ` hey! welcome to the server ${socket.id}`);
    socket.on('userJoined', (data) => {
        userdata = data;
        console.log(`${data.name} has joined with room id ${data.roomid} and user id ${data.uid}`);
        socket.join(data.roomid);
        socket.broadcast.to(data.roomid).emit('newuser', { ...data, uid: 0 });
        socket.on('chatmessage', (message) => {
            console.log('message aaya ', message);
            socket.broadcast.to(data.roomid).emit("chatbackend", message);
        });
        socket.on('drawing_cordinates', (drawing_cordinates) => {
            console.log('drawing data aaya', drawing_cordinates);
            socket.broadcast.to(data.roomid).emit('drawing_cordinates', drawing_cordinates);
        });
    });
});
server.listen(3000, () => console.log('server listening at port 3000'));
