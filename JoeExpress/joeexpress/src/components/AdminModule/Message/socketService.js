import { io } from "socket.io-client";

const socket = io("https://jaydscafe.com", {
    transports: ["websocket"]
});

export default socket;