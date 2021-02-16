import express, {json} from 'express'
import routes from './routes'
import path from "path";

const app = express()

app.get('/opencv', (rea, res) => {
    console.log('opencv')
    res.sendFile(path.join(__dirname, '/pages/', "opencv" + ".html"))
})
app.get('/broadcaster', (rea, res) => {
    console.log('stream')
    res.sendFile(path.join(__dirname, '/pages/', "broadcaster" + ".html"))
})
app.use('/api/', routes)
app.use('/static', express.static('public'))
app.use(json())

export default app