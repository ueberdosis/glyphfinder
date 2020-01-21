const fs = require('fs')
const bail = require('bail')
const csv = require('csv-parser')

const codepoints = []

fs.createReadStream('./src/data/data.csv')
  .pipe(csv())
  .on('data', data => {
    // console.log(data)
    codepoints.push(data)
***REMOVED***)
  .on('end', () => {
    fs.writeFile('./src/data/data.json', JSON.stringify(codepoints, null, 2), bail)
***REMOVED***)
