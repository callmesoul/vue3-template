/* sentry 添加 commitId */
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

let template = 'VITE_COMMIT_ID={COMMIT_INFO}'

exec('git rev-parse HEAD', function(error, stdout, stderr) {
  template = template.replace('{COMMIT_INFO}', stdout.trim())

  fs.writeFileSync(path.join(__dirname, '../.env.local'), template)

  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
