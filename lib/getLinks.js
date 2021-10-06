const fse = require('fs-extra');
const fsp = require('fs').promises

const chalk = require('chalk');
const path = require('path');
const marked= require('marked');
//const file=(ruta)=>(fsp.readFile(pathFile,'utf-8').then((r)=>r));
const getLinks = (pathFile) => {
  const renderer = new marked.Renderer();
  //cambiar readFileSync
  const file = fse.readFileSync(pathFile,'utf-8');   
  //console.log(`estoy en en validate: ${archivo}`);
 
 // const renderer = new marked.Renderer();
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
