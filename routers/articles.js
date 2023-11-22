const express = require('express')
const {fetchSingleArticle} = require('../middlewares/fileReadWrite')

const router = express.Router()

// get all comments of an article
router.get('/:articleId/comments',fetchSingleArticle,(req,res)=>{
    res.status(200).json(res.locals.result.comments)
})

// Fetch one article
router.get('/:articleId',fetchSingleArticle,(req,res)=>{
    res.status(200).json(res.locals.result)
})

module.exports = router