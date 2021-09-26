const chalk = require('chalk');
//const { mdLink } = require('./lib/mdLinks');
const { mdLink } = require('./lib/md-links');
const prueba =process.argv.slice(2);

const main = async () => {
  if(prueba[1] == '--validate' && prueba[2]==undefined)
    mdLink(prueba[0],{validate:true})
    .then((resolve) =>{
      console.log(resolve);
    })
  else {
    await mdLink(prueba[0],{validate:false})
          .then((resolve)=>{
            //setTimeout(()=>{
              console.log(resolve);
            //},18000)
            
          })
  }  
}

main();
//console.log(process.argv);










