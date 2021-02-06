import cv from 'C:\\Users\\destr\\AppData\\Roaming\\npm\\node_modules\\opencv4nodejs'

export default class WebCam {
    constructor(width = 300, height = 300) {
        this.cv = cv
        this.cam = new this.cv.VideoCapture(0)
        this.cam.set(cv.CAP_PROP_FRAME_WIDTH, width)
        this.cam.set(cv.CAP_PROP_FRAME_HEIGHT, height)
    }


    setWidth(width) {
        this.cam.set(this.cv.CAP_PROP_FRAME_WIDTH, width)
    }

    setHeight(height) {
        this.cam.set(this.cv.CAP_PROP_FRAME_HEIGHT, height)
    }

    imgEncode(img) {
        return this.cv.imencode('.jpg', img)
    }

    wRead() {
        return this.cam.read()
    }
}