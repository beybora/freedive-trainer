import { io } from "socket.io-client";

const socket = io(process.env.SOCKET_SERVER_URL || 'http://localhost:4000', {
  transports: ["websocket"],
});

export default socket;