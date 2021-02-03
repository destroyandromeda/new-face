import mongoose from 'mongoose'
import FaceBase from '../recognition/FaceBase'
import FaceTeach from '../recognition/FaceTeach'

export class TestController {

    async get(req, res) {
        let face = new FaceTeach()
        await face.init()
        console.log('f',face)
        res.json({
            data: 'req'
        })
    }

}

