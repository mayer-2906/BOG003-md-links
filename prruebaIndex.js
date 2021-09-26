const chalk = require('chalk');
//const { testcli } = require('./lib/validate');
const  { mdLink } = require('./lib/md-links');
//const prueba =process.argv.slice(2);


const tetsprueba = () => {
  const prueba =process.argv.slice(2);
  console.log(chalk.blueBright('Pueba de consola'));
  console.log(prueba)
  //testcli();
  mdLink(prueba[0]);
}
//console.log(chalk.blueBright('Pueba de consola'));
//console.log(testcli);

tetsprueba();
//module.exports = {tetsprueba};
