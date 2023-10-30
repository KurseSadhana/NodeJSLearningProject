
const { readFile, writeFile } = require('fs')


const readFileMiddleware = (req,res,next)=>{
    try{
        readFile(`./data/${req.params.fileName}.json`,'utf8', (err, result) => {
            if (err) {
              res.status(200).send("No such file/directory")
              return
            }
            res.status(200).send(result)
          })
    }
    catch(err){
        res.status(200).send("No such file/directory")
    }
    
}


const writeIntoFile = (req,res,next)=>{
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method,url,time,req.body)
    console.log(res.locals)

    writeFile(
        `./data/${res.locals.writeFile}.json`,
        JSON.stringify(res.locals.writeData),
        (err, result) => {
          if (err) {
            console.log(err)
            return
          }
          console.log('done with this task',result)
        }
      )

    next()
}
const middlewareWrapper = (array,fileName)=>{
    return (req,res,next)=>{
        const {
            author,
            content,
            title
        } = req.body
        array.push({
            "id":array.length,
            "author":author,
            "publishedDate":new Date().getFullYear(),
            "content":content,
            "title":title
        })
        res.locals.writeData = array
        res.locals.writeFile = fileName
       
        next()
    }
}
module.exports = {writeIntoFile,middlewareWrapper,readFileMiddleware}