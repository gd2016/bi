const fs = require('fs')
const path = require('path')
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const dirName = fs.readdirSync('./src').filter( dir => {return dir.indexOf('.')===- 1})
let appModules = dirName.map(element => {
  let path = resolveApp(`src/${element}/index.js`)
  let name = element
  return {path,name}
})
function getEntries(){
  const entries = {};
  const files = appModules;
  files.forEach(({name, path}) => {
    entries[name] = [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      path,
    ].filter(Boolean);
  });
  return entries;
}