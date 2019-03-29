var fs = require('file-system');

const files = () => {
  fs.recurse('.', ['**/package.json', '!node_modules/**/package.json'], 
    (filepath, relative, filename) => {
      if (filename === 'package.json') {
        let folderDepth = filepath.split('/');
        folderDepth.pop();
        if (folderDepth.length > 0) console.log(`cd ${filepath.replace('package.json','')}`);
        console.log(`npm i --quiet`);
        for (let i = 0; i < folderDepth.length; i++) {
          console.log(`cd ..`);
        }
      }
    }
  )
}

module.exports = {
  files
}
