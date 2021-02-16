import app from "./app"
import SocketIO from 'socket.io'

import WebCamStream from "./streams/WebCamStream";
import DataBase from "./database/DataBase";

const start = async () => {
    console.log('Server prepared...')
    await DataBase.connect()
    const server = app.listen(process.env.APP_PORT)
    const io = SocketIO(server)

    let broadcaster = null

    io.on("error", e => console.log(e));
    io.on('connection', async (socket) => {

        console.log('Client connected...')

        socket.on("opencv", () => {
            let stream = new WebCamStream(io)
            console.log(stream)

            stream.openFaceDetectionStream()
        })

        socket.on("broadcaster", async () => {
            socket.emit("broadcaster");
        });


        socket.on('disconnect', function () {
            console.log('Client disconnect...')
        })
    })
}

start().then(() => console.log(`Server started on ${process.env.APP_URL}:${process.env.APP_PORT}`))