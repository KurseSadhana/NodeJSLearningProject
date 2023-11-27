const { readFile, writeFile } = require('fs')
const {readJSONFile} = require('../utils/fileReadWrite')


const readArticlesMiddleware = (req,res,next)=>{
    try{
       const file = readJSONFile('articles')
       file.then((data)=>{
        res.locals.result = data
        next()
       })
    }
    catch(err){
        res.status(200).send("No such file/directory")
    } 
}

const readFileMiddleware = (req,res,next)=>{
    try{
       const file = readJSONFile(req.params.fileName)
       file.then((data)=>{
        res.locals.result = data
        next()
       })
    }
    catch(err){
        res.status(200).send("No such file/directory")
    } 
}

//file name hardcoded
const fetchSingleArticle = (req,res,next)=>{
    try{
       const file = readJSONFile("articles")
       file.then((data)=>{
        res.locals.result = data.find(d=>d.id === Number(req.params.articleId))
        console.log(res.locals)
        next()
       })
    }
    catch(err){
        res.status(200).send("No such file/directory")
    } 
}

const updateMiddleware = (req,res,next)=>{
    let tempIndex = res.locals.result.findIndex(el=>el.id == Number(req.params.id))
    let newObj = {
        ...res.locals.result[tempIndex],
        ...req.body
    }
    res.locals.result[tempIndex] = newObj
    res.locals.writeData = res.locals.result
    res.locals.writeFile = req.params.fileName
    next()
}
const deleteMiddleware = (req,res,next)=>{
    let tempIndex = res.locals.result.findIndex(el=>el.id === Number(req.params.id))
    res.locals.result.splice(tempIndex,1)
    res.locals.writeData = res.locals.result
    res.locals.writeFile = req.params.fileName
    next()
}
const addCommentMiddleware = (req,res,next)=>{
    let tempIndex = res.locals.result.findIndex(el=>el.id == Number(req.params.articleId))

    if(req.params.commentId){
        let tempComment =  res.locals.result[tempIndex].comments.findIndex(el=>el.id === Number(req.params.commentId))
        let newObj = {
            ...res.locals.result[tempIndex].comments[tempComment],
            ...req.body
        }
        res.locals.result[tempIndex].comments[tempComment] = newObj

    }
    else{
        let newObj = {
            id:res.locals.result[tempIndex].comments.length,
            ...req.body
        }
        res.locals.result[tempIndex].comments.push(newObj)
    }
    
    res.locals.writeData = res.locals.result
    res.locals.writeFile = "articles"
    next()
}

const deleteCommentMiddleware = (req,res,next)=>{
    let tempIndex = res.locals.result.findIndex(el=>el.id == Number(req.params.articleId))

    let tempComment =  res.locals.result[tempIndex].comments.findIndex(el=>el.id === Number(req.params.commentId))
    res.locals.result[tempIndex].comments.splice(tempComment,1)
    console.log(res.locals.result[tempIndex])
   
    
    res.locals.writeData = res.locals.result
    res.locals.writeFile = "articles"
    next()
}

const writeIntoFile = (req,res,next)=>{
    writeFile(
        `./data/${res.locals.writeFile}.json`,
        JSON.stringify(res.locals.writeData),
        (err, result) => {
          if (err) {
            console.log(err)
            return
          }
          console.log('done with this task')
        }
      )

    next()
}
const middlewareArticleWrapper = (fileName)=>{
    
    return (req,res,next)=>{
        const {
            author,
            content,
            title
        } = req.body
        let array = res.locals.result
        array.push({
            "id":array.length,
            "author":author,
            "publishedDate":new Date().getFullYear(),
            "content":content,
            "title":title,
            "comments":[]

        })
        res.locals.writeData = array
        res.locals.writeFile = fileName
        
        next()
    }
}

const middlewareWrapper = (fileName)=>{
  return (req,res,next)=>{
     let array = res.locals.result
      array.push(req.body)
      res.locals.writeData = array
      res.locals.writeFile = fileName
      
      next()
  }
}




module.exports = {writeIntoFile,middlewareWrapper,middlewareArticleWrapper,readFileMiddleware,readArticlesMiddleware,fetchSingleArticle,updateMiddleware,addCommentMiddleware,deleteCommentMiddleware,deleteMiddleware}