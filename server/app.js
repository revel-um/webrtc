import express from 'express';
import { Server } from "socket.io";
import Config from "./config/index.js";
import UserServices from './services/room.services.js';


export default class App {
    static start() {
        const app = express();

        app.get('/health', (req, res) => {
            res.status(200).json({ message: 'Okay' });
        })

        const server = app.listen(Config.config.port, () => {
            console.log(`Express server listening on port ${Config.config.port}`);
        });

        const io = new Server(server, {
            cors: true,
        });

        io.on("connection", (socket) => {
            console.log(`Socket Connected`, socket.id);
            socket.on("room:join", (data) => {
                console.log("room:join: ", data);
                const { email, room } = data;

                try {
                    UserServices.createUserRoom(email, room)
                } catch (error) {
                    console.error(error);
                }
                io.to(room).emit("user:joined", { email, id: socket.id });
                socket.join(room);
                io.to(socket.id).emit("room:join", data);
            });

            socket.on("user:call", ({ to, offer }) => {
                io.to(to).emit("incomming:call", { from: socket.id, offer });
            });

            socket.on("call:accepted", ({ to, ans }) => {
                io.to(to).emit("call:accepted", { from: socket.id, ans });
            });

            socket.on("peer:nego:needed", ({ to, offer }) => {
                io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
            });

            socket.on("peer:nego:done", ({ to, ans }) => {
                io.to(to).emit("peer:nego:final", { from: socket.id, ans });
            });
        });
    }
}