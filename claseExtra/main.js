// const array = ["Angel", "Miguel", "Pablo", "Marisol", "Juan", "Santas"];

// //pop elimina el ultimo elemento
// console.log("Original", array);
// const result01 = array.pop();
// console.log("Elemento eliminado", result01);
// console.log("Modificado", array);

// //pop elimina el primero
// console.log("Original", array);
// const result02 = array.shift();
// console.log("Elemento eliminado", result02);
// console.log("Modificado", array);

// //agregar un elemento al array al final
// array.push("Nuevo al final");

// //agrega un elemento al inicio
// console.log(array);
// array.unshift("nuevo al principio");

// //slice extrae inicio fin
// const result03 = array.slice(3);
// console.log("extrae", result03);

// // splice reemplaza, elimina,
// const result04 = array.splice(1, 0, 'buu')

// // concat
// //une dos arrays

// const array3 = result03.concat(result04);
const usuarios0 = ["Edgardo"];
const usuarios1 = ["Juan", "Alberto"];
const usuarios = ["leydy", "Maria", "Erica", "Naty", "Juanita"];

for (let i = 0; i < 10; i++) {
  //debugger;
  console.log(i);
}

const obtenerChatStatus = (users) => {
  const cant = users.length;
  if (users.length === 1) {
    console.log(`${users} esta conectada`);
  }

  if (users.length === 2) {
    console.log(`${users.join(" y ")} están conectados`);
  }

  if (users.length > 2) {
    const result = users.slice(0, 2);
    const num = cant - 2;
    console.log(`${result.join(" , ")} y ${num} persona(s) están conectados`);
  }
};

obtenerChatStatus(usuarios0);
obtenerChatStatus(usuarios1);
obtenerChatStatus(usuarios);
