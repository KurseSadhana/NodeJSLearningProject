
const express = require('express')
const app = express()
const articleRoute = require('./routers/articles')
const userRoute = require('./routers/users')
const commentsRoute = require('./routers/comments')
app.use(express.urlencoded({extended:false}));

app.use(userRoute)
app.use(articleRoute)

app.use(commentsRoute)

app.get('/',(req,res)=>{
    res.status(200).send("Welcome")
})



app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})