import express, {json} from 'express'
import routes from './routes'
import path from "path";

const app = express()

app.get('/', (rea, res) => {
    console.log('sad')
    res.sendFile(path.join(__dirname, '/../', "index.html"))
})

app.use('/api/', routes)
app.use('/static', express.static('public'))
app.use(json())

export default app