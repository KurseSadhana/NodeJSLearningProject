const express = require('express')
const {readFileMiddleware,updateMiddleware,deleteMiddleware,writeIntoFile} = require('../middlewares/fileReadWrite')
const router = express.Router()


// update API 
router.put('/:fileName/:id',readFileMiddleware,updateMiddleware,(req, res) => {
    res.status(200).json(res.locals.result)
})

//DELETE API
router.delete('/:fileName/:id',readFileMiddleware,deleteMiddleware,writeIntoFile,(req, res) => {
    res.status(200).json(res.locals.result)
})

module.exports = router