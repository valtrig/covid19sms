const fileSystem = require('fs-extra');
const replaceInFile = require('replace-in-file');

const FONTAWESOME_DIR = 'fontawesome-free/';
const BUILD_DIR = 'public/';

// Create or clear the build directory and copy sources and other assets into it.
fileSystem.emptyDirSync(BUILD_DIR);
fileSystem.copySync('src/', BUILD_DIR);
fileSystem.copySync(`node_modules/@fortawesome/${FONTAWESOME_DIR}`, BUILD_DIR + FONTAWESOME_DIR);

// Replace version number placeholder in sources with the one specified in 'package.json'.
replaceInFile.sync({
  from: '{{version}}',
  to: process.env.npm_package_version,
  files: [
    `${BUILD_DIR}pwa.js`,
    `${BUILD_DIR}index.html`,
  ],
});
