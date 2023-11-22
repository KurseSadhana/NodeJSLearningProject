
const {writeIntoFile,middlewareArticleWrapper,middlewareWrapper,readFileMiddleware,updateMiddleware,addCommentMiddleware,deleteCommentMiddleware,deleteMiddleware} = require('./middlewares/fileReadWrite')
const {readJSONFile} = require('./utils/fileReadWrite')
const express = require('express')
const app = express()
const articles = require('./routers/articles')
// const fileName = require('./routers/filename')

app.use(express.urlencoded({extended:false}));

app.use('/api/article',articles)
// app.use('/api/:fileName',fileName)

app.get('/',(req,res)=>{
    res.status(200).send("Welcome")
})

//GET API'S  
// Common get all function
app.get('/api/getAll/:fileName',readFileMiddleware,(req,res)=>{
    let {start, end} = req.body
    if(start && end){
        let pagination = res.locals.result.slice(Number(req.body.start),Number(req.body.end))
        res.status(200).send(pagination)
    }
    else{
        res.status(200).json(res.locals.result)
    }
})



app.get('/api/user/:userId',async(req,res)=>{
    let users = await readJSONFile('users')
    const obj = users.find((el)=>el.id === Number(req.params.userId))   
    res.status(200).json(obj)
})

//Create an Article
app.post('/api/:fileName',readFileMiddleware, middlewareArticleWrapper("articles"),writeIntoFile,(req, res) => {
    res.send("created article successfuly")
  })


app.post('/api/users', readFileMiddleware,middlewareWrapper("users"),writeIntoFile,(req, res) => {
    res.send("created user successfuly")
})


//UPDATE API
app.put('/api/:fileName/:id',readFileMiddleware,updateMiddleware,(req, res) => {
    res.status(400).json(res.locals.result)
})


//create comment
app.put('/api/:fileName/:articleId/comment',readFileMiddleware,addCommentMiddleware,writeIntoFile,(req, res) => {
    res.status(200).json(res.locals.result)
})
// update comments
app.put('/api/:fileName/:articleId/comments/:commentId',readFileMiddleware,addCommentMiddleware,writeIntoFile,(req, res) => {
    res.status(200).json(res.locals.result)
})

//DELETE API
app.delete('/api/:fileName/:id',readFileMiddleware,deleteMiddleware,writeIntoFile,(req, res) => {
    res.status(200).json(res.locals.result)
})

app.delete('/api/:fileName/:articleId/comments/:commentId',readFileMiddleware,deleteCommentMiddleware,writeIntoFile,(req, res) => {
    res.status(200).json(res.locals.result)
})


app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})