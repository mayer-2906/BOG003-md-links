const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const fse = require('fs-extra');
//const chalk = require('chalk');
//const path = require('path');
const marked= require('marked');
const jsdom = require('jsdom');
const { Console } = require('console');
const {JSDOM} = jsdom;
//const axios = require('axios');

//const validarStatus= async (enlace) => {
//  //return new promises(resolve =>{
//    await axios.get('enlace')
//    .then(respuesta=>{
//      console.log(respuesta.status)
//      //resolve(respuesta)
//    })
//    .catch(error=>{
//      console.log(error.code)
//    })
//  //})
//}
//funcion para validar los link con fetch
//const validarStatus = (arrayLinks) => {
//  const arrayValidados=[];
//  arrayValidados.push(arrayLinks.forEach((link) =>{
//    console.log(`estoy en validLinks: ${link.href}`)
//    return fetch(link.href).then((resp) =>{
//        console.log('hice la petición')
//        link.statusCode = resp.status;
//        link.status = resp.statusText;
//        return link;
//    })
//    .catch((err)=>{
//        link.statusCode = err.code;
//        link.status = 'FAIL';
//        return link;
//    })               
//  }));     
//
//  return Promise.all(arrayValidados);
//}
const linksValidate=[];
const validarStatus = async (arrayLinks) => { 
  //return new Promise((resolve)=>{
    const iteratorLinks=arrayLinks[Symbol.iterator]();
    for await (let link of iteratorLinks){    
      var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(link.href);
      console.log(`link: ${valid}`)
      //console.log(link.href);
      if(valid==true){
       await fetch(link.href)
          .then((resp) =>{
            console.log('hice la petición')
            link.statusCode = resp.status;
            link.status = resp.statusText;
            linksValidate.push(link)
            console.log(link);
          })
          .catch((err)=>{
              //console.log(`estoy en el error del iterator`)
              link.statusCode = err.code;
              link.status = 'FAIL';
              linksValidate.push(link);
          })               
      }
    }
  //  resolve(linksValidate);
  return linksValidate;
  //})   
}

const validate = (rutaArchivo,options) => {
  // Obtenenemos la ruta del archivo
  //const ruta = path.dirname(rutaArchivo);
  //console.log(`esta es la ruta: ${ruta}`);
  // Extraemos el contenido del archivo
  const archivo = fse.readFileSync(rutaArchivo,'utf-8'); 
  //console.log(archivo);
  //convertimos el texto del archivo en contenido html
  const archivoHtml = marked(archivo);
  //console.log(archivoHtml);
  //creamos un objeto dom para poder manupularlo y extraer los enlaces de los tags a
  const dom = new JSDOM(`<!DOCTYPE html> ${archivoHtml}`)
  //Extraemos todas las etiquetas a
  const arrayOfLinks=dom.window.document.querySelectorAll('a');
  //console.log(arrayOfLinks);
  //creamos el array que va a contener los objetos con la informaciòn de cada link
  const arrayOfObjectLink=[];
  //recorremos el array para extraer los datos de cada link
  arrayOfLinks.forEach(link =>{
      arrayOfObjectLink.push({
        href:link.getAttribute('href'),
        text:link.innerHTML,
        file:rutaArchivo
      })
    }) 
  
  if(options==true){
    //console.log(`voy hacer petición http de: ${arrayOfObjectLink[11].href}`)
    validarStatus(arrayOfObjectLink)
      //.then(resp=>{
        //setTimeout(()=>{
          //console.log(`respondio validar status`)
          //return resp;
        //},15000);
        //console.log(`respondio validar status`)
        return(linksValidate);
      //})
      //.catch(()=>{
//
      //})
    //console.log(`soy linksValidate: ${linksValidate}`);
    
  }else{
    return arrayOfObjectLink;
  }
   
}

module.exports={validate}