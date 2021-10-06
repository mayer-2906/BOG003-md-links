const { mdLink }= require('../lib/md-links');
const path = require('path');


describe('mdLinks', () => {

  test('deberia ser una función', () => {
    expect(typeof mdLink).toBe('function');
  });
  test('debería retornar un array de objetos con href, text, path', () => {
    expect(
      mdLink('./mdPrueba/prueba2', { validate: false }),
    ).resolves.toEqual([
      {
        href: 'https://git-scm.com/',
        text: 'Git',
        path: path.join(process.cwd(), './mdPrueba/prueba2/prueba4/README.md'),
      },     
      {
        href: '#1-preámbulo',
        text: '1. Preámbulo',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
      },
      {
        href: 'https://github.com/microsoft/vscode-java-dependency#manage-dependencies',
        text: 'here',        
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/browser/02-dom/03-1-dom-methods-selection',
        text: 'Manipulación del DOM',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction',
        text: 'Introducción al DOM - MDN',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/impo',
        text: 'Modulos Import',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
      },
    ]);
  });
  test('debería retornar un array de objetos con href, text, path, statusCode, status', async () => {
    const array=await mdLink('./mdPrueba/prueba2', { validate: true });
    expect(array).toEqual([
      [
        {
          href: 'https://git-scm.com/',
          text: 'Git',
          path: path.join(process.cwd(), './mdPrueba/prueba2/prueba4/README.md'),
          status: 200,
          statusText: 'OK',
        },
      ],
      [
      {
        href: '#1-preámbulo',
        text: '1. Preámbulo',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
        status: '404',
        statusText: 'FAIL',
      },  
      {
        href: 'https://github.com/microsoft/vscode-java-dependency#manage-dependencies',
        text: 'here',        
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
        status: 200,
        statusText: 'OK',
      },
      {
        href: 'https://curriculum.laboratoria.la/es/topics/browser/02-dom/03-1-dom-methods-selection',
        text: 'Manipulación del DOM',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
        status: 200,
        statusText: 'OK',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction',
        text: 'Introducción al DOM - MDN',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
        status: 200,
        statusText: 'OK',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias/impo',
        text: 'Modulos Import',
        path: path.join(process.cwd(), './mdPrueba/prueba2/README4.md'),
        status: 404,
        statusText: 'Not Found',
      },
    ],
    ]);
  });
  test('deberia retornar un mensaje de error', ()=>{
    expect(mdLink('./mdPrueba/prueba3', { validate: false }),
    ).rejects.toEqual('no se encontraron archivos md');
  });
  test('deberia retornar un mensaje de error', ()=>{
    expect(mdLink('./mdPrueba/prueba4', { validate: false }),
    ).rejects.toEqual('ruta o comando invalido');
  });
});




