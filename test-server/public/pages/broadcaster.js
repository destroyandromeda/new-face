const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('static/weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('static/weights'),
    faceapi.nets.faceRecognitionNet.loadFromUri('static/weights'),
    faceapi.nets.faceExpressionNet.loadFromUri('static/weights')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

const detection = (canvas, displaySize) => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        var ctx = canvas.getContext('2d');

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        draw(ctx,resizedDetections)

        // faceapi.draw.drawDetections(canvas, resizedDetections)
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)


    }, 100)
}

function draw(ctx,resizedDetections) {
    if(resizedDetections[0] && resizedDetections[0].detection){
        let box = resizedDetections[0].detection.box
        ctx.strokeRect(box.x, box.y, box.width, box.height);
    }
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, displaySize)
    detection(canvas, displaySize)
})