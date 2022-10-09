// https://github.com/facebook/create-react-app
'use strict';

const getPublicUrlOrPath = require('./getPublicUrlOrPath.js');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appPath: resolveApp('.'),
  appIndex: resolveModule(resolveApp, './src/index'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appSource: resolveApp('src'),
  appHtml: resolveApp('public/index.html'),
  babelConfig: resolveApp('config/babel.config.json'),
  publicUrlOrPath,
};
