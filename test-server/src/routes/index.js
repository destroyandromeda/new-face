import express from 'express'
let router = express.Router()
import test from "./test"

router.use('/test', test)

export default router