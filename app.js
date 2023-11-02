// const articles = require('./data/articles.json')
// const users = require('./data/users.json')
const {writeIntoFile,middlewareArticleWrapper,fetchSingleArticle,middlewareWrapper,readFileMiddleware,updateMiddleware,updateCommentMiddleware} = require('./middlewares/fileReadWrite')
const {readJSONFile} = require('./utils/fileReadWrite')
const express = require('express')
const app = express()
app.use(express.urlencoded({extended:false}));


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

// get all comments of an article
app.get('/api/article/:articleId/comments',fetchSingleArticle,(req,res)=>{
    res.status(200).json(res.locals.result.comments)
})

// Fetch one article
app.get('/api/article/:articleId',fetchSingleArticle,(req,res)=>{
    res.status(200).json(res.locals.result)
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
app.put('/api/article/:articleId/comment',readFileMiddleware,updateCommentMiddleware,(req, res) => {
    res.status(400).json(res.locals.result)
})



//DELETE API


app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})