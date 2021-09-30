const chalk = require('chalk');

const statsOflinks = (links) => {
  const total = links.length;
  const unique = new Set(links.map((link) => link.href)).size;
  const result = `\n${chalk.magenta('Total: ')} ${total} \n${chalk.blue('Unique: ')} ${unique}`;
  return result;
};

const validateStats = (hrefLInk) => {
  const total = hrefLInk.length;
  const unique = new Set(hrefLInk.map(({ href }) => href)).size;
  const broken = hrefLInk.filter((link) => link.statusText === 'FAIL').length;
  const result = `\n${chalk.magenta('Total: ')} ${total} \n${chalk.blue('Unique: ')} ${unique} \n${chalk.red('Broken: ')} ${broken}`;
  return result;
};

const stats = (arrayObject,opcion) =>{
  const links=[];
  arrayObject.forEach(element => {
    element.forEach(link=>links.push(link))
  });
  //console.log(links);
  if(opcion){
    return validateStats(links);
  }
  else{
    return statsOflinks(links);
  }
}

module.exports ={stats}

