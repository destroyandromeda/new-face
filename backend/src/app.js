import express, {json} from 'express'
import morgan from 'morgan'
import routes from './routes'

const app = express()

app.use('/api/', routes)
app.use('/static', express.static('public'))
app.use(morgan('dev'))
app.use(json())

export default app