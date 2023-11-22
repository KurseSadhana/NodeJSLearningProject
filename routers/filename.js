const express = require('express')
const {readFileMiddleware,updateMiddleware} = require('../middlewares/fileReadWrite')
const router = express.Router()

router.put('/:id',readFileMiddleware,updateMiddleware,(req, res) => {
    res.status(200).json(res.locals.result)
})

module.exports = router