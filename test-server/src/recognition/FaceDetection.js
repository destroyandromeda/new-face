import FaceBase from "./FaceBase";

export default class FaceDetection extends FaceBase{
    constructor() {
        super();
    }


    async drawDetection(imgBuff){

        let img = await this.canvas.loadImage(imgBuff);
        const detections = await this.faceApi.detectAllFaces(img, new this.faceApi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
        const out = this.faceApi.createCanvasFromMedia(img)
        this.faceApi.draw.drawDetections(out, detections)
        return out.toBuffer('image/jpeg').toString('base64')
    }
}