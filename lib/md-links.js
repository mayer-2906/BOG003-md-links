const fse = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const markd= require('marked');
const { getLinks } = require('./getLinks');
const { validate } = require('./validate');

const rutaValida = (ruta) => (fse.existsSync(ruta));

const rutaAbsoluta = (ruta) => (path.isAbsolute(ruta)? ruta: path.resolve(ruta));

const isDirectorio = (ruta) => (fse.lstatSync(ruta).isDirectory());

const isFile = (ruta) => (fse.lstatSync(ruta).isFile());

const isMarkdown = (ruta) => path.extname(ruta) === '.md';

const arrayFiles = [];
const getFiles = (ruta) => {
  //const arrayFiles = [];
  const rutaAbs = rutaAbsoluta(ruta);
  if (isFile(rutaAbs)) {
    if (isMarkdown(rutaAbs)) {
      arrayFiles.push(rutaAbs);
    }
  } else {
    fse.readdirSync(rutaAbs).forEach((element) => {
      getFiles(path.join(rutaAbs, element));
      
    });
  }

  //return arrayFiles;
};

const arrayLinks=[];
const mdLink = (ruta, options = {validate: false}) => {
  //const arrayArchivos= getFiles(ruta)
  //console.log(arrayArchivos);
  return new Promise((resolve,reject)=>{
    getFiles(ruta)
    // Si se encontaron archivos md...
    if(arrayFiles.length){
      //console.log('este es el array de archivos: ' +arrayArchivos);
      if(!options.validate){
        arrayFiles.forEach((archivo)=>{       
          arrayLinks.push(...getLinks(archivo));
        })
        resolve(arrayLinks); 
      }
      else{
        const nuevoResolve=arrayFiles.map((archivo)=>
        validate(archivo)
        .then((resol)=>resol)
        .catch(()=>reject('hubo un error inesperado'))
        )
        resolve(Promise.all(nuevoResolve).then((respt)=>respt))
      }   
    }else{
      reject('no se encontraron archivos md')
    }   

  })
}

module.exports = {mdLink}
