import servidor from "./server.js"

const puerto = 3000;

servidor.listen(puerto)
console.log("servidor funcionando: " + puerto);