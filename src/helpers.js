export function nestedValue(mainObject, key) {
  try {
    return key.split('.').reduce((obj, property) => obj[property], mainObject)
***REMOVED*** catch (err) {
    return null
***REMOVED***
}
