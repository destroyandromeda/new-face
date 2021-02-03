import {Router} from 'express'
const router = Router()

import {TestController} from "../controllers/test.controller"
const test = new TestController()

router.get('/', test.get)


export default router