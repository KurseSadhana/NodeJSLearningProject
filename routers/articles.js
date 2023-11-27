const express = require('express')
const {fetchSingleArticle,readArticlesMiddleware} = require('../middlewares/fileReadWrite')

const router = express.Router()

// get all comments of an article
router.get('/:articleId/comments',fetchSingleArticle,(req,res)=>{
    res.status(200).json(res.locals.result.comments)
})

// Fetch one article
router.get('/:articleId',fetchSingleArticle,(req,res)=>{
    res.status(200).json(res.locals.result)
})


router.get('/',readArticlesMiddleware,(req,res)=>{
    let {start, end} = req.body
    if(start && end){
        let pagination = res.locals.result.slice(Number(req.body.start),Number(req.body.end))
        res.status(200).send(pagination)
    }
    else{
        res.status(200).json(res.locals.result)
    }
})

module.exports = router