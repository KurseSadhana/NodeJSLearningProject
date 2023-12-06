const { readJSONFile,writeJSONFile } = require("../utils/fileReadWrite");

const allUsers = (req, res) => {
  const file = readJSONFile("users");
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

const singleUser = (req, res) => {
  const file = readJSONFile("users");
  file.then((data) => {
    let user = data.find((d) => d.id === Number(req.params.userId));
    res.status(200).json(user);
  });
};

const updateUser = (req, res) => {
  const file = readJSONFile("usrs");
  file.then((data) => {
    let tempIndex = data.findIndex(el=>el.id == Number(req.params.userId))
    let newObj = {
      ...data[tempIndex],
      ...req.body,
    };
    if(tempIndex>=0){
        data[tempIndex] = newObj;
        writeJSONFile('users',JSON.stringify(data))
        res.status(200).json(data);
    }
    else{
        res.status(404).json("Requested User not found");
    }
  });
};

const addUser = (req, res) => {
    const file = readJSONFile("users");
    file.then((data) => {
        let array = data
        array.push({
            "id":data.length,
            ...req.body
        })
        writeJSONFile('users',JSON.stringify(array))
        res.status(200).json(array);
    });
};

const deleteUser = (req, res) => {
  const file = readJSONFile("users");
  file.then((data) => {
      let userIndex = data.findIndex((d) => d.id === Number(req.params.userId));
      data.splice(userIndex,1)
      writeJSONFile('users',JSON.stringify(data))
      res.status(200).json(data);
  });
};

module.exports = {
  allUsers,
  singleUser,
  updateUser,
  addUser,
  deleteUser
};
