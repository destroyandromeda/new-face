import * as faceApi from 'face-api.js'
import * as canvas from 'canvas'
import fetch from "node-fetch"


export default class FaceBase {
    constructor() {
        this.canvas = canvas
        this.faceApi = faceApi
        this.path = './public/images/'
    }

    init() {
        this.faceApi.env.monkeyPatch({fetch, Canvas: this.canvas.Canvas, Image: this.canvas.Image})
        return Promise.all([
            this.faceApi.nets.tinyFaceDetector.loadFromDisk('./src/recognition/weights'),
            this.faceApi.nets.faceRecognitionNet.loadFromDisk('./src/recognition/weights'),
            this.faceApi.nets.faceLandmark68Net.loadFromDisk('./src/recognition/weights'),
            this.faceApi.nets.faceLandmark68TinyNet.loadFromDisk('./src/recognition/weights'),
            this.faceApi.nets.ssdMobilenetv1.loadFromDisk('./src/recognition/weights')
        ])
    }


}