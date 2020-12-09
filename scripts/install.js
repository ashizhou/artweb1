// scripts/install.js
const fs = require('fs')
const path = require('path')

// create vendor directory if it does not exist
const vendor = 'node_modules/node-sass/vendor'
if (!fs.existsSync(vendor)) {
  fs.mkdirSync(vendor)
}

const platforms = ['darwin', 'linux', 'win32']

platforms.forEach(platform => {
  // create directories if they do not exist
  const directory = `node_modules/node-sass/vendor/${platform}-x64-72`
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  // copy files into their vendor directories
  fs.copyFileSync(
    `dependencies/${platform}-x64-72_binding.node`,
    path.join(directory, 'binding.node')
  )
})
