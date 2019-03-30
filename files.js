const fs = require('file-system');

const installDependencies = () => {
  const REPO = process.argv[2];
  const TITLE = process.argv[3];
  fs.recurse(`../${REPO}/${TITLE}`, ['**/package.json', '!node_modules/**/package.json'], 
    (filepath, relative, filename) => {
      if (filename === 'package.json') {
        let folderDepth = filepath.split('/');
        folderDepth.pop();
        console.log(`echo Installing dependencies for ${TITLE}.`)
        if (folderDepth.length > 0) console.log(`cd ${filepath.replace('package.json','')}`);
        console.log(`npm i --quiet`);
        for (let i = 0; i < folderDepth.length; i++) {
          console.log(`cd ..`);
        }
      }
    }
  )
}

installDependencies();
