#2 PARCIAL PRACTICO DE PROGRAMACION WEB
Tecnologia Usada: Node.js + Express
Puerto: 3130

Este proyecto API REST funciona gestionando informacion de cuentas bancarias desde un archivo JSON, y este a su vez permite enlistar cuentas, buscar por ID o parametros y obtener la suma total los balances de cuentas activas.

*Para una correcta instalacion:*
en el bash de la carpeta:
npm install
npm start
Esto daria inicion al servidor http://localhost:3130

*ENDPOINTS*
Recalcar que subi una carpeta de capturas de cadad uno de estos

GET /cuentas
que devuelve todas las cuentas.

GET /cuenta/:id
Busca una cuenta por su ID.

GET /cuentas?queryParam=valor
Busca una cuenta por ID,Nombre o Genero.

GET /cuentaBalance
Suma los valores de las cuentas activas.

Asi finalizo la entrega de mi parcial 2 de WEB de ante mano muchas gracias...
