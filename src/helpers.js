import { app as backendApp, remote } from 'electron'

export const app = backendApp || remote.app

export const isMac = process.platform === 'darwin'

export const isWindows = !isMac

export const isProduction = process.env.NODE_ENV === 'production'

export const isDevelopment = !isProduction

export function findDuplicatesInArray(data = []) {
  const result = []

  data.forEach((element, index) => {
    if (data.indexOf(element, index + 1) > -1) {
      if (result.indexOf(element) === -1) {
        result.push(element)
    ***REMOVED***
  ***REMOVED***
***REMOVED***)

  return result
}

export function isSameArray(array1, array2) {
  const match1 = array1.every(key => array2.includes(key))
  const match2 = array2.every(key => array1.includes(key))

  return match1 && match2
}

export function getArrayDepth(value) {
  if (!Array.isArray(value)) {
    return 0
***REMOVED***

  if (!value.length) {
    return 1
***REMOVED***

  return 1 + Math.max(...value.map(getArrayDepth))
}

export function nestedValue(mainObject, key) {
  try {
    return key.split('.').reduce((obj, property) => obj[property], mainObject)
***REMOVED*** catch (err) {
    return null
***REMOVED***
}
