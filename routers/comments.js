const express = require('express')
const router = express.Router()

const { allComments, singleComment, updateComments, addComment,deleteComment } = require('../controllers/comments')


router.get('/articles/:articleId/comments',allComments)
router.get('/articles/:articleId/comments/:commentId',singleComment)
router.put('/articles/:articleId/comments/:commentId',updateComments)
router.post('/articles/:articleId/comments',addComment)
router.delete('/articles/:articleId/comments/:commentId',deleteComment)
module.exports = router