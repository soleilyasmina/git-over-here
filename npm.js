const fs = require('file-system');

const installDependencies = () => {
  const REPO = process.argv[2];
  const TITLE = process.argv[3];
  fs.recurse(`../${REPO}/${TITLE}`, ['**/package.json', '!node_modules/**/package.json'], 
    (filepath, relative, filename) => {
      if (filename === 'package.json') {
        let folderWithPJ = filepath.split('/');
        folderWithPJ.pop();
        let folder = folderWithPJ.join('/');
        console.log(`echo Installing dependencies for ${TITLE}.`);
        console.log(`cd ${folder}`);
        console.log(`npm i --quiet`);
        console.log(`cd -`);
      }
    }
  )
}

installDependencies();
