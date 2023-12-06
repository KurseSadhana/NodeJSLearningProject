const { readJSONFile,writeJSONFile } = require("../utils/fileReadWrite");

const allArticles = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let { start, end } = req.body;
    if (start && end) {
      let pagination = data.slice(Number(req.body.start), Number(req.body.end));
      res.status(200).send(pagination);
    } else {
      res.status(200).json(data);
    }
  });
};

const singleArticle = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let article = data.find((d) => d.id === Number(req.params.articleId));
    res.status(200).json(article);
  });
};

const updateArticle = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let tempIndex = data.findIndex(el=>el.id == Number(req.params.articleId))
    let newObj = {
      ...data[tempIndex],
      ...req.body,
    };
    if(tempIndex>=0){
        data[tempIndex] = newObj;
        writeJSONFile('articles',JSON.stringify(data))
        res.status(200).json(data);
    }
    else{
        res.status(404).json("Requested Article not found");
    }
  });
};

const addArticle = (req, res) => {
    const file = readJSONFile("articles");
    file.then((data) => {
        const {
            author,
            content,
            title
        } = req.body
        let array = data
        array.push({
            "id":data.length,
            "author":author,
            "publishedDate":new Date().getFullYear(),
            "content":content,
            "title":title,
            "comments":[]

        })
        writeJSONFile('articles',JSON.stringify(array))
        res.status(200).json(array);
    });
};

const deleteArticle = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
      let articleIndex = data.findIndex((d) => d.id === Number(req.params.userId));
      data.splice(articleIndex,1)
      writeJSONFile('articles',JSON.stringify(data))
      res.status(200).json(data);
  });
};

module.exports = {
  allArticles,
  singleArticle,
  updateArticle,
  addArticle,
  deleteArticle
};
