const fse = require('fs-extra');
const fsp = require('fs').promises;
//const chalk = require('chalk');
const path = require('path');
//const markd= require('marked');
const { getLinks } = require('./getLinks');
const { validate } = require('./validate');

const rutaValida = (ruta) => (fse.existsSync(ruta));

const rutaAbsoluta = (ruta) => (path.isAbsolute(ruta)? ruta: path.resolve(ruta));

const isDirectorio = (ruta) => (fse.lstatSync(ruta).isDirectory());

//const isFile = (ruta) => (fse.lstatSync(ruta).isFile());
const isFile = (ruta) => (fsp.stat(ruta).then((stat)=>stat.isFile()));
const isMarkdown = (ruta) => path.extname(ruta) === '.md';


const getFiles = (ruta) => {
  let arrayFiles = [];
  const rutaAbs = rutaAbsoluta(ruta);
  //console.log(`lines 47: ${rutaAbs}`);
  return new Promise((resolve)=>{
    isFile(rutaAbs)
    .then((resp)=>{
      if(resp){
        if (isMarkdown(rutaAbs)) {
          //console.log(rutaAbs);
          arrayFiles.push(rutaAbs);
          //console.log(arrayFiles);
          resolve(arrayFiles)
        }
        else{
          resolve(arrayFiles);
        }
      }else{
            const promisesArray=fse.readdirSync(rutaAbs).map((element) =>{
              return getFiles(path.join(rutaAbs, element,))             
            });   
            Promise.all(promisesArray).then((responses)=>{
              //console.log(responses);
              responses.forEach((response)=>{
                if(response.length>0){
                  arrayFiles=arrayFiles.concat(response)
                  //console.log(arrayFiles);
                }
              })
              resolve(arrayFiles)
            });  
      }
    })

  })  
}
const arrayLinks=[];
const mdLink = (ruta, options = {validate: false}) => {

  return new Promise((resolve,reject)=>{
    if(rutaValida(ruta)){
      //const arrayFiles=[]
      getFiles(ruta)
      .then((arrayFiles)=>{
        //console.log(arrayFiles);
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
            //.catch(()=>reject('hubo un error inesperado'))
            )
            resolve(Promise.all(nuevoResolve).then((respt)=>respt))
          }   
        }else{
          reject('no se encontraron archivos md')
        }   
      })

                                                                              
    }else{
      reject('ruta o comando invalido')
    }
  })
}

module.exports = {mdLink}
