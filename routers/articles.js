const express = require('express')
const router = express.Router()
const {
    allArticles,
    singleArticle,
    updateArticle,
    addArticle,
    deleteArticle
} = require('../controllers/articles')


router.get('/articles',allArticles)
router.get('/articles/:articleId',singleArticle)
router.put('/articles/:articleId',updateArticle)
router.delete('/articles/:articleId',deleteArticle)
router.post('/articles',addArticle)


















// get all comments of an article
// router.get('/:articleId/comments',fetchSingleArticle,(req,res)=>{
//     res.status(200).json(res.locals.result.comments)
// })

// Fetch one article
// router.get('/:articleId',fetchSingleArticle,(req,res)=>{
//     res.status(200).json(res.locals.result)
// })


// router.get('/',readArticlesMiddleware,(req,res)=>{
//     let {start, end} = req.body
//     if(start && end){
//         let pagination = res.locals.result.slice(Number(req.body.start),Number(req.body.end))
//         res.status(200).send(pagination)
//     }
//     else{
//         res.status(200).json(res.locals.result)
//     }
// })

module.exports = router