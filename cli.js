#!/usr/bin/env node
const { stats: statsCLI } = require("./lib/stats"); //como hay una opcion stasts entones usamos un alias para la funcion stats
const chalk = require("chalk");
const { mdLink } = require("./lib/md-links");
if (process.argv.length <= 2) {
  //si solo hay 2 argumentos entonces no especificaron la ruta que hay que procesar
  console.log("ERROR");
  return -1;
}

const path = process.argv[2]; //ruta que se debe procesar
const arg = process.argv.slice(2);
//A continuacion usamos destructuring de un objecto como el siguiente construido a partir de los argumentos
// {
//   validate: true,
//   help: true,
//   contact: true,
//   stats: true,
//   version: true
// }
//para que el codigo quede mas simple
const { help, version, contact, stats, validate } = Object.fromEntries(
  arg.map((param) => [param.replace("--", ""), true])
);

if (help) {
  const helpMsg = `
    ${chalk.greenBright("md-links-Mariela-Candelo")}\n
    ${chalk.blueBright("version 1.0.0")}\n
  `;
  console.log(helpMsg);
  return 0;
}
if (version) {
  console.log("1.0.0");
  return 0;
}
if (contact) {
  console.log("Mariela Candelo(mayercandelo.1985@gmail.com)");
  return 0;
}

//solo se llama una sola vez la funcion mdLink
mdLink(path, { validate })
  .then((resolve) => {
    let salida = "";
    if (stats) {
      salida = statsCLI(resolve, stats && validate);
    } else {
      resolve.forEach((link) => {
          salida += `
            href: ${chalk.blueBright(link.href)}
            text: ${chalk.yellow(link.text)}
            path: ${chalk.greenBright(link.path)}
          `;
          //agregamos las llaves statusCode y status unicamente si esta el parametro --validate
          if (validate) {
            salida += `
            statusCode: ${chalk.magenta(link.status)}
            status: ${chalk.magentaBright(link.statusText)}
            `;
          }
        });
    }
    console.log(salida);
    return 0;
  })
  .catch((e) => {
    console.log(e);
    return -1;
  });
