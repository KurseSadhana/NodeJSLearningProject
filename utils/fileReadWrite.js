const { readFile, writeFile } = require("fs");
const fs = require("fs/promises");
const path = "./data/";

async function writeJSONFile(fileName, content) {
  const file = `${path}${fileName}.json`;
  try {
    const data = await fs.writeFile(file, content, { encoding: "utf8" }, (err) => {
      console.log(err);
      return err;
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function readJSONFile(fileName) {
  const file = `${path}${fileName}.json`;
  try {
    const data = await fs.readFile(file, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { readJSONFile, writeJSONFile };
