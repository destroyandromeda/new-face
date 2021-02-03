const express = require('express')
const app = express()

app.get('/', (rea, res) => {
    res.sendFile('../index.html')
})

app.listen()