const chalk = require('chalk');
//const { mdLink } = require('./lib/mdLinks');
const { mdLink } = require('./lib/md-links');
const arg =process.argv.slice(2);

const main = () => {
  if(arg[1] == '--validate' && arg[2]==undefined){
    //const solucion = (
    mdLink(arg[0],{validate:true})
    .then((resolve) =>{
      //console.log(resolve);
      let salida;
      resolve.forEach(obje => {
        obje.forEach(link=>{
          salida+=`${chalk.blueBright(link.href)}\n${chalk.yellow(link.text)}\n${chalk.greenBright(link.path)}\n${chalk.magenta(link.status)}\n${chalk.magentaBright(link.statusText)}\n\n`;
        })
      });
      console.log(salida);
    })
    .catch((error)=>{
      console.log(error);
    })
  }else{
    if((arg[1] === "--stats" && arg[2] === "--validate") || (arg[1] === "--validate" && arg[2] === "--stats")){

    }
    if(arg[1] === undefined && arg[2] === undefined){
      mdLink(arg[0],{validate:false})
        .then((resolve)=>{
            let solucion;
            resolve.forEach(link => {
              solucion+=`${chalk.blueBright(link.href)}\n${chalk.yellow(link.text)}\n${chalk.greenBright(link.path)}\n\n`;
            });
            console.log(solucion);

        }).catch((error)=>{
          console.log(error)
        })
    }  

  }
}

main();
//console.log(process.argv);










