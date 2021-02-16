const socket = io.connect('http://192.168.1.2:3433')

socket.emit('opencv','start')

socket.on('image', (data) => {
    const imageEl = document.getElementById('image')
    imageEl.src = `data:image/jpeg;base64,${data}`
})

