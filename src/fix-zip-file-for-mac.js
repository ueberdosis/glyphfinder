const { execSync } = require('child_process')
const yaml = require('js-yaml')
const fs = require('fs')

console.log('Current directory:')
console.log(__dirname)
console.log('All files in the currenct directory:')
fs.readdir(__dirname, (err, files) => {
  if (err) {
    return console.log(`Unable to scan directory: ${err}`)
  }

  return files.forEach(file => {
    console.log(file)
  })
})

const info = require('../package.json')

const appPath = `dist_electron/mac/${info.productName}.app`

console.log('Zipping...')
console.log(execSync(`ditto -c -k --sequesterRsrc --keepParent "${appPath}" "dist_electron/${info.productName}-${info.version}-mac.zip"`).toString())
console.log('Finished zipping!')

console.log('Collect data...')
const blockmap = JSON.parse(execSync(`node_modules/app-builder-bin/mac/app-builder blockmap -i dist_electron/${info.productName}-${info.version}-mac.zip -o dist_electron/th.zip`).toString())
blockmap.blockMapSize = parseInt(execSync('ls -l dist_electron/th.zip | awk \'{print $5}\' && rm dist_electron/th.zip').toString(), 10)

const doc = yaml.safeLoad(fs.readFileSync(`${__dirname}/../dist_electron/latest-mac.yml`, 'utf8'))

doc.files[0].sha512 = blockmap.sha512
doc.files[0].size = blockmap.size
doc.files[0].blockMapSize = blockmap.blockMapSize
doc.sha512 = blockmap.sha512

fs.writeFileSync(`${__dirname}/../dist_electron/latest-mac.yml`, yaml.safeDump(doc, {
  lineWidth: 65535,
}), 'utf8')
