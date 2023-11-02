const { readFile, writeFile } = require('fs')
const fs = require('fs/promises');
const path = './data/'

// async function readJSONFile(fileName){
//     const file = `${path}${fileName}.json`
//     let result = await readFile(file,'utf8', (err, result) => {
//         if (err) {
//            return "No such file/directory"
//         } 
//         return JSON.parse(result)
//       })
//     return result
// }

async function readJSONFile(fileName) {
    const file = `${path}${fileName}.json`
    try {
      const data = await fs.readFile(file, { encoding: 'utf8' });
      return JSON.parse(data)
    } catch (err) {
      console.log(err);
      return err
    }
  }

module.exports = {readJSONFile}