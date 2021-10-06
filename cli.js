#!/usr/bin/env node 

const chalk = require('chalk');
//const { mdLink } = require('./lib/mdLinks');
const { mdLink } = require('./lib/md-links');
const { stats } =require('./lib/stats');
const arg =process.argv.slice(2);

const main = (path,arg1,arg2) => {
  if(arg1 == '--validate' && arg2==undefined){
    //const solucion = (
    mdLink(path,{validate:true})
    .then((resolve) =>{
      //console.log(resolve);
      let salida='';
      resolve.forEach(obje => {
        obje.forEach(link=>{
          salida+=`href: ${chalk.blueBright(link.href)}\ntext: ${chalk.yellow(link.text)}\npath: ${chalk.greenBright(link.path)}\nstatusCode: ${chalk.magenta(link.status)}\nstatus: ${chalk.magentaBright(link.statusText)}\n\n`;
        })
      });
      console.log(salida);
      //return salida
    })
    .catch((err)=>{
      console.log(err);
      //return error
    })
  }else{
    if((arg1 === "--stats" && arg2 === "--validate") || (arg1 === "--validate" && arg2 === "--stats")){
      mdLink(path,{validate:true})
      .then((resolve) =>{
        //console.log(resolve);
        let salida='';
        let opcion=true
        salida=stats(resolve, opcion);
        console.log(salida);
        //return salida
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    if(arg1=== "--stats" && arg2 === undefined){
      mdLink(path,{validate:true})
        .then((resolve) =>{
          //console.log(resolve);
          let salida;
          let opcion2=false
          salida=stats(resolve, opcion2);
          console.log(salida);
          //return salida
        })
        .catch((err)=>{
          console.log(error)
        })
    }
    if(arg1 === undefined && arg2 === undefined){
      mdLink(path,{validate:false})
        .then((resolve)=>{
            let solucion='';
            resolve.forEach(link => {
              solucion+=`href: ${chalk.blueBright(link.href)}\ntext: ${chalk.yellow(link.text)}\npath: ${chalk.greenBright(link.path)}\n\n`;
            });
            console.log(solucion);
            //return solucion

        }).catch((error)=>{
          console.log(error)
          //return error
        })
    }  

  }
}

const help = `
  ${chalk.greenBright("md-links-Mariela-Candelo")}\n
  ${chalk.blueBright("version 1.0.0")}\n
`;

if (arg.length < 4) {
  if (arg[0] === "--help" || arg[0] === "-h") {
    console.log(help);
    return
  }
  if (arg[0] === undefined) {
    console.log(help);
    return
  }
  if (arg[0] === "-v" || arg[0] === "--version") {
    console.log("1.0.0");
    return
  }
  if (arg[0] === "-c" || arg[0] === "--contact") {
    console.log("Mariela Candelo(mayercandelo.1985@gmail.com)");
    return
  } else {
    //console.log("llamo a main: "+ arg[0]);
    main(arg[0], arg[1], arg[2])
      //.then((resolve) => console.log(resolve))
      //.catch((err) => console.log(err));
  }
} else {
  console.log(help);
}

module.exports={main}
//console.log(process.argv);










