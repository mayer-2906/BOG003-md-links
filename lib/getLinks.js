const fse = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const marked= require('marked');

const getLinks = (pathFile) => {
  const renderer = new marked.Renderer();
  const file = fse.readFileSync(pathFile,'utf-8'); 
  //console.log(`estoy en en validate: ${archivo}`);
  const arrOfLinks= [];  
  renderer.link = (urlFile, _, urlText) => {
    arrOfLinks.push({
      href: urlFile,
      text: urlText,
      path: pathFile,
    });
  }
  marked(file, { renderer });
  return arrOfLinks;
}

module.exports={getLinks}
