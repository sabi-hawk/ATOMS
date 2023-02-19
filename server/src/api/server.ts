import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import apiRouter from "./routes/index";
import fileUpload from "express-fileupload";
import path from "path";
import http from "http";
import { Server } from "socket.io";

type socketUser = {
  userId: string,
  socketId: string
}
const app = express();


dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Set Access-Control-Allow-Origin header
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//   next();
// });

// socket
const server = http.createServer(app);
const socket = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let activeUsers: Array<socketUser> = [];
socket.on('connection', (client) => {
  console.log('a user connected');

  client.on('new-user-add', (newUserId) => {
    if (!activeUsers.some((user: socketUser) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: client.id
      })
    }
    console.log("Connected Users", activeUsers);
    socket.emit('get-users', activeUsers);
  })
  client.on('disconnected', () => {
    activeUsers = activeUsers.filter((user: socketUser) => user.socketId !== client.id)
    console.log('user disconnected', activeUsers);
    socket.emit('get-users', activeUsers);
  })

  client.on('chat message', (message: string) => {
    console.log(`message: ${message}`);
    socket.emit('chat message', message);
  })
})
// socket end
app.use((req, res, next) => {
  // console.log(`HTTP Method - ${req.method} , URL - ${req.url}`);
  next();
})
console.log("Here is path:", path.join(__dirname, '../../public'))

app.use("/images", express.static(path.join(__dirname, '../../public')))

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/api", apiRouter);

server.listen(3002, () =>
  console.log(`Socket running on port: 3002`)
)
console.log("ENV:", process.env.MONGODB_URI);
mongoose.set("strictQuery", false);
mongoose
  // @ts-ignore
  .connect(process.env.MONGODB_URI, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port: ${process.env.PORT}`))

  )
  .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);
