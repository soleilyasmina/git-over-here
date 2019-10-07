const fs = require('file-system');

const installDependencies = () => {
  const REPO = process.argv[2];
  const TITLE = process.argv[3];
  fs.recurse(`../${REPO}/${TITLE}`, ['Gemfile', '**/Gemfile'],
    (filepath, relative, filename) => {
      if (filename === 'Gemfile') {
        let folderWithPJ = filepath.split('/');
        folderWithPJ.pop();
        let folder = folderWithPJ.join('/');
        console.log(`echo Installing dependencies for ${TITLE}.`);
        console.log(`cd ${folder}`);
        console.log(`bundle install`);
        console.log(`cd -`);
      }
    });
};

installDependencies();
