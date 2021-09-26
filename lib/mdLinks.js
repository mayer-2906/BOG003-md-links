const fse = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const markd= require('marked');
const { resolve } = require('path/posix');
//const { resolve } = require('path/posix');
//const { Console } = require('console');

const rutaValida = (ruta) => (fse.existsSync(ruta));

const rutaAbsoluta = (ruta) => {
  if(!path.isAbsolute(ruta))
   return path.resolve(ruta);
  return ruta;
  
};

const isDirectorio = (ruta) => (fse.lstatSync(ruta).isDirectory());

const isFile = (ruta) => (fse.lstatSync(ruta).isFile());

const isMarkdown = (ruta) => path.extname(ruta) === '.md';
const arrayFiles=[];
const getFiles = (ruta) => {
  //const files = new Promise((resolve) => {
    //const arrayFiles=[];
    const rutaAbs = rutaAbsoluta(ruta);
    //console.log({rutaAbs});
    if(isFile(rutaAbs)) {
      if(isMarkdown(rutaAbs)){
        //resolve(arrayFiles.push(path.basename(rutaAbs)));
        arrayFiles.push(rutaAbs)
        //console.log(rutaAbs);
        //resolve(arrayFiles.push(rutaAbsoluta));
        //resolve(arrayFiles);
        //return arrayFiles;
      }//else{
        //console.log('no es un archivo md');
      //}
    } else {
      //const filespromesas=[];
      fse.readdirSync(rutaAbs).forEach(element => {
        //const newFile = getFiles(path.join(rutaAbs,element));
        getFiles(path.join(rutaAbs,element));
        //filespromesas.push(newFile)
        //if(isFile(newFile) && isMarkdown(newFile)){
          //arrayFiles.push(newFile);
          //resolve(arrayFiles);
          //return arrayFiles;
        //}
      })
      //Promise.all(filespromesas)
      //resolve(arrayFiles);
    }
  //});
  //return files;
}

const arrayObjetosValidate=[];
const mdLink = (ruta, option = {validate: false}) => {
  //const files = new Promise((resolve)=>{
//
  //})
  if(rutaValida(ruta)){
    //const nuevoArray=await getFiles(ruta)
    getFiles(ruta)
    console.log(arrayFiles);
    //.then((resolve) => {
    //  //console.log(resolve);
    //  resolve.forEach(element => {        
    //      //const newObject = validate(element);
    //      //arrayObjetosValidate.push
    //      //if(isMarkdown(element)){
    //         console.log(`archivo md: ${chalk.greenBright(element)}`)
    //      //}
    //  });      
    //})
    //.catch((error) => {
    //  console.log(error);
    //})
  }else{
    console.log('ruta invalida inicial')
  }

}

module.exports = {mdLink};
