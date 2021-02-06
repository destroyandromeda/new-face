import FaceBase from './FaceBase'
import * as fs from 'fs';
import * as path from 'path';
const baseDir = path.resolve(__dirname, '../out')


export default class FaceTeach extends FaceBase {
    constructor() {
        super()
    }


    saveFile(fileName, buf) {
        if (!fs.existsSync(baseDir)) {
            fs.mkdirSync(baseDir)
        }

        fs.writeFileSync(path.resolve(baseDir, fileName), buf)
    }

    async getAllFaces(imgPath) {
        let img = await this.canvas.loadImage(imgPath);
        let detections = await this.faceApi
            .detectAllFaces(img, new this.faceApi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors()
        return this.faceApi.resizeResults(detections, {
            width: img.width,
            height: img.height
        })
    }

    async draw(imgPath) {
        let img = await this.canvas.loadImage(imgPath);
        const detections = await this.faceApi.detectAllFaces(img, new this.faceApi.TinyFaceDetectorOptions())
        const out = this.faceApi.createCanvasFromMedia(img)
        this.faceApi.draw.drawDetections(out, detections)
        return out.toBuffer('image/jpeg')
    }


}