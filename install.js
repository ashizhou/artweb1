// scripts/install.js
const execSync = require('child_process').execSync

const command = `npm install node-sass --sass-binary-path="dependencies/${process.platform}-x64-72_binding.node"`

const options = { stdio: 'inherit' }
execSync(command, options)
execSync('npm rebuild node-sass', options)