import {Router} from 'express'
const router = Router()

import TestController from "../controllers/test.controller"

router.get('/', TestController.get)


export default router