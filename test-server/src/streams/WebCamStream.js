import WebCam from "./WebCam";
import FaceDetection from "../recognition/FaceDetection";

export default class WebCamStream extends WebCam {

    constructor(io) {
        super(300, 300)
        this.faceDetection = new FaceDetection()
        this.fps = 12
        this.ms = 1000 / this.fps
        this.io = io
        this.stream = null
    }

    async prepareWebCamDetection() {
        await this.faceDetection.loadWeights()
    }

    async startDetectionOnWebCam() {
        const frame = this.wRead()
        const imgBuff = this.imgEncode(frame)
        const image = imgBuff.toString('base64')
        try {
            let imageFace = await this.faceDetection.drawDetection(imgBuff)
            this.io.emit('image', imageFace)
        } catch (e) {
            this.io.emit('image', image)
        }
    }

    async commonStream() {
        const frame = this.wRead()
        const imgBuff = this.imgEncode(frame)
        const image = imgBuff.toString('base64')
        this.io.emit('image', image)
    }

    openCommonStream() {
        this.camOn()
        if (this.io)
            this.stream = setInterval(() => this.commonStream(), this.ms)
    }

    openFaceDetectionStream() {
        this.camOn()
        if (this.io)
            this.prepareWebCamDetection()
                .then(() => this.stream = setInterval(() => this.startDetectionOnWebCam(), this.ms))

    }

    openFaceRecognitionStream() {
        this.camOn()
        if (this.io)
            this.prepareWebCamDetection()
                .then(() => this.stream = setInterval(() => this.startDetectionOnWebCam(), this.ms))
    }

    close() {
        this.camOff()
        if(this.stream){
            clearInterval(this.stream)
        }
    }
}