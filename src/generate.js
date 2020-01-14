const fs = require('fs')
const https = require('https')
const bail = require('bail')
const concat = require('concat-stream')
const YAML = require('yaml')
const collect = require('collect.js')
const entityLookupData = require('./entity-lookup')

function format(data) {
  return collect(data)
    .groupBy('symbol')
    .map(items => {
      const { symbol } = items.first()
      const entities = items.map(item => item.entity).toArray()
      const entityLookupItem = collect(entityLookupData)
        .filter(item => entities.includes(item.name))
        .map(item => ({
          ...item,
          tags: item.tags.slice(1),
    ***REMOVED***)
        .first()
      const tags = entityLookupItem ? entityLookupItem.tags : []

***REMOVED*** [{
        symbol,
        entities,
        tags,
    ***REMOVED***]
***REMOVED***
    .flatten(1)
    .toArray()
}

function onconcat(response) {
  const data = JSON.parse(response)
  const entities = []

  Object.keys(data).forEach(key => {
    if (key[key.length - 1] === ';') {
      entities.push({
        entity: key.slice(1, -1),
        symbol: data[key].characters,
  ***REMOVED***
  ***REMOVED***
***REMOVED***)

  const formattedEntities = format(entities)

  fs.writeFile('src/data.yaml', YAML.stringify(formattedEntities), bail)
}

// https://www.w3.org/TR/xml-entity-names/
https.get('https://html.spec.whatwg.org/entities.json', res => {
  res.pipe(concat(onconcat)).on('error', bail)
})
