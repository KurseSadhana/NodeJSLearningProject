const { readJSONFile, writeJSONFile } = require("../utils/fileReadWrite");

const allComments = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let article = data.find((d) => d.id === Number(req.params.articleId));
    console.log(article);
    res.status(200).json(article.comments);
  });
};

const singleComment = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let article = data.find((d) => d.id === Number(req.params.articleId));
    console.log(article);
    let comment = article.comments.find(
      (c) => c.id === Number(req.params.commentId)
    );
    res.status(200).json(comment);
  });
};

const updateComments = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let tempIndex = data.findIndex(
      (el) => el.id == Number(req.params.articleId)
    );
    let commentIndex = data[tempIndex].comments.findIndex(
      (el) => el.id == Number(req.params.commentId)
    );

    let newObj = {
      ...data[tempIndex].comments[commentIndex],
      ...req.body,
    };

    if (commentIndex >= 0) {
      data[tempIndex].comments[commentIndex] = newObj;
      writeJSONFile("articles", JSON.stringify(data));
      res.status(200).json(data);
    } else {
      res.status(404).json("Requested Article not found");
    }
  });
};

const addComment = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let tempIndex = data.findIndex(
      (el) => el.id == Number(req.params.articleId)
    );
    if (req.params.commentId) {
      let tempComment = data[tempIndex].comments.findIndex(
        (el) => el.id === Number(req.params.commentId)
      );
      let newObj = {
        ...data[tempIndex].comments[tempComment],
        ...req.body,
      };
      data[tempIndex].comments[tempComment] = newObj;
    } else {
      let newObj = {
        id: data[tempIndex].comments.length,
        ...req.body,
      };
      data[tempIndex].comments.push(newObj);
    }
    // console.log(data)
    writeJSONFile("articles", JSON.stringify(data));
    res.status(200).json(data);
  });
};

const deleteComment = (req, res) => {
  const file = readJSONFile("articles");
  file.then((data) => {
    let tempIndex = data.findIndex(
      (el) => el.id == Number(req.params.articleId)
    );
    let commentIndex = data[tempIndex].comments.findIndex(
      (el) => el.id == Number(req.params.commentId)
    );

    if (commentIndex >= 0) {
      data[tempIndex].comments.splice(commentIndex, 1);
      writeJSONFile("articles", JSON.stringify(data));
      res.status(200).json(data);
    } else {
      res.status(404).json(" Article not found");
    }
 
  });
};

module.exports = {
  allComments,
  singleComment,
  updateComments,
  addComment,
  deleteComment
};
