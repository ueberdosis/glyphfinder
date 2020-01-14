const fs = require('fs')
const https = require('https')
const bail = require('bail')
const concat = require('concat-stream')
const YAML = require('yaml')
const collect = require('collect.js')

function onconcat(response) {
  const data = JSON.parse(response)
  const entities = []

  Object.keys(data).forEach(key => {
    if (key[key.length - 1] === ';') {
      entities.push({
        name: key.slice(1, -1),
        value: data[key].characters,
        tags: [],
  ***REMOVED***
  ***REMOVED***
***REMOVED***)

  const formattedEntities2 = collect(entities)
    .groupBy('value')
    .map(items => [{
      value: items.first().value,
      entities: items.map(item => item.name),
      tags: [],
  ***REMOVED***])
    .flatten(1)
    .toArray()

  fs.writeFile('src/data.yaml', YAML.stringify(entities), bail)
  fs.writeFile('src/data2.yaml', YAML.stringify(formattedEntities2), bail)
}

function onconnection(res) {
  res.pipe(concat(onconcat)).on('error', bail)
}

https.get('https://html.spec.whatwg.org/entities.json', onconnection)
