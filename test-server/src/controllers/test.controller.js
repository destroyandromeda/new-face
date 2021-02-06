export default class TestController {
    static get(req, res) {
        res.json({
            data: 'req'
        })
    }
}

