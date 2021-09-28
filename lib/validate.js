const fse = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const marked= require('marked');
const {getLinks} = require('./getLinks');
const fetch = require('node-fetch');

const validate = (ruta) => {
  const arrayOfLinks = getLinks(ruta); // archivos md
  const arrayLinksPromises = arrayOfLinks.map((link) =>
    fetch(link.href).then((resp) =>
      ({
        ...link,
        status: resp.status,
        statusText: resp.statusText,
      })).catch(() => ({
        ...link,
        status: '404',
        statusText: "FAIL",
      }))
  );
  //console.log(arrayLinksPromises);  
  return Promise.all(arrayLinksPromises).then((respt)=>respt);
};
module.exports={validate}