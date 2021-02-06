import app from "./app"
import SocketIO from 'socket.io'

import WebCamStream from "./streams/WebCamStream";
import DataBase from "./database/DataBase";

const start = async () => {
    console.log('Server prepared...')
    await DataBase.connect()
    const server = app.listen(process.env.APP_PORT)
    const io = SocketIO(server)

    io.on('connection', async (socket) => {
        console.log('Client connected...')
        let stream = new WebCamStream(io)
        stream.openFaceDetectionStream()
        socket.on('disconnect', function () {
            stream.close()
            console.log('Client disconnect...')
        })
    })
}

start().then(() => console.log(`Server started on ${process.env.APP_URL}:${process.env.APP_PORT}`))