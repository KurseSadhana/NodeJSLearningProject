const articles = require('./data/articles.json')
const {writeIntoFile,middlewareWrapper,readFileMiddleware} = require('./middlewares/fileReadWrite')
const express = require('express')
const app = express()
app.use(express.urlencoded({extended:false}));




// Fetch all articles
//to do - support pagination
app.get('/api/articles',(req,res)=>{
    
    res.status(200).json(articles)
})

// Common get all function
app.get('/api/getAll/:fileName',readFileMiddleware,(req,res)=>{
    
    res.status(200).json(articles)
})


// Fetch one article
app.get('/api/article/:articleId',(req,res)=>{
    const article = articles.find((article)=>article.id === Number(req.params.articleId))   
    res.status(200).json(article)
})

// app.use(writeIntoFile)
//Create an Article
app.post('/api/article', middlewareWrapper(articles,"articles"),writeIntoFile,(req, res) => {
    res.send("created successfuly")
  })

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})