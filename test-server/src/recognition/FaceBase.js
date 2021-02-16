import * as faceApi from 'face-api.js'
import * as canvas from 'canvas'
import fetch from "node-fetch"

import '@tensorflow/tfjs-node'

export default class FaceBase {
    constructor() {
        this.canvas = canvas
        this.faceApi = faceApi
    }

    loadWeights() {

        this.faceApi.env.monkeyPatch({fetch, Canvas: this.canvas.Canvas, Image: this.canvas.Image})
        return Promise.all([
            this.faceApi.nets.tinyFaceDetector.loadFromDisk('./public/weights'),
            this.faceApi.nets.faceRecognitionNet.loadFromDisk('./public/weights'),
            this.faceApi.nets.faceLandmark68Net.loadFromDisk('./public/weights'),
            this.faceApi.nets.faceLandmark68TinyNet.loadFromDisk('./public/weights'),
            this.faceApi.nets.ssdMobilenetv1.loadFromDisk('./public/weights')
        ])
    }


}