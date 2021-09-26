const fse = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const markd= require('marked');
//const { validate } = require('./validate');
const { validate } = require('./validateHtml');

const rutaValida = (ruta) => (fse.existsSync(ruta));

const rutaAbsoluta = (ruta) => (path.isAbsolute(ruta)? ruta: path.resolve(ruta));

const isDirectorio = (ruta) => (fse.lstatSync(ruta).isDirectory());

const isFile = (ruta) => (fse.lstatSync(ruta).isFile());

const isMarkdown = (ruta) => path.extname(ruta) === '.md';

const arrayArchivos=[];

const getFiles = (ruta) => {     
    if(rutaValida(ruta)){  
      const rutaAbs=rutaAbsoluta(ruta);    
      if(isFile(rutaAbs)){             
        if(isMarkdown(rutaAbs)){
          arrayArchivos.push(rutaAbs);
        }
      }else{
        fse.readdirSync(rutaAbs).forEach(element => {
          getFiles(path.join(rutaAbs, element))                                                //console.log(element);
        });
      }
    } 
}
const arrayLinks=[];
const mdLink = (ruta, options = {validate: false}) => {
  return new Promise((resolve)=>{
    getFiles(ruta)
    //console.log(arrayArchivos);
    // Si se encontaron archivos md...
    if(arrayArchivos.length){
        arrayArchivos.forEach(element=>{
          //const enlaces=validate(element,options.validate)
          arrayLinks.push(validate(element,options.validate));  
          //arrayLinks.push(...enlaces);        
        })
      //console.log(options.validate);
      //setTimeout(()=>{
        //console.log(`respondio validate`);
        resolve(arrayLinks);
      //},16000)
      //resolve(arrayLinks);
    }

  })
}

module.exports = {mdLink}
