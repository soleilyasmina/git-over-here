const fs = require('file-system');

const installDependencies = () => {
  const REPO = process.argv[2];
  const TITLE = process.argv[3];
  fs.recurse(`../${REPO}/${TITLE}`, ['Gemfile','**/Gemfile'], 
    (filepath, relative, filename) => {
      if (filename === 'Gemfile') {
        let folderDepth = filepath.split('/');
        folderDepth.pop();
        console.log(`echo Installing dependencies for ${TITLE}.`)
        if (folderDepth.length > 0) console.log(`cd ${filepath.replace('Gemfile','')}`);
        console.log(`bundle install`);
        for (let i = 0; i < folderDepth.length; i++) {
          console.log(`cd ..`);
        }
      }
    }
  )
}

installDependencies();
