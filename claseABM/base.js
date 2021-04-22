//ABM
//es un acronimo que hace referencia a las operaciones comunes que solemos realizar en los diferentes sistemas y aplicaciones

const users = [
  { id: "000", name: "maria", score: "50" },
  { id: "001", name: "Jose", score: "60" },
  { id: "002", name: "Alejandra", score: "70" },
  { id: "003", name: "Alberto", score: "45" },
];

//Agregando elementos (A)
//Insertar 1 o varios elementos al inicio  unshift
//Insertar al final push (modifica el array y devuelve la longitud)
//Insertar en una posicion especifica
const create = () => {
  let long = users.push(
    { id: "004", name: "katherine", score: "90" },
    { id: "005", name: "steffany", score: "85" }
  );
  long = users.unshift(
    { id: "006", name: "Mario", score: "60" },
    { id: "007", name: "Sebastian", score: "47" }
  );
  //console.log(long, users);
  //devuelve un array con los elementos eliminados
  users.splice(1, 0, { id: "009", name: "Priscila", score: "89" });
};

//Editar y obtener elementos(M)
//actualiza el valor de un elemento existente dentro del array
//conociendo la posicion
//conocemos en el id del item que deseamos actualizar
const edit = (id) => {
  //   const user = users[0];
  //   user.score = "68";
  //   console.log(users);
  const user = users.find((e) => e.id === id);
  //usuario que deseo modificar
  user.score = "68";
  console.log(users);
};

//Eliminar
//eliminar el elemento de un array
const deleteElem = (id) => {
  //eliminar del principio shift
  //eliminar del final pop
  //eliminar de una posicion especifica
  const posUser = users.findIndex((e) => e.id === id);
  users.splice(posUser, 1);
  console.log(posUser, users);
};

//reemplazar
//accion consiste en insertar en un posicion ya ocupada un nuevo item, completo
const replace = (id) => {
  const posUser = users.findIndex((e) => e.id === id);
  const user = users.splice(posUser, 1, {
    id: "00x",
    name: "Soe",
    score: "100",
  });
  console.log(posUser, user, "delete");
  console.log(users);
};

//filtrar elementos
const filterElem = (value) => {
  const result = users.filter((e) => Number(e.score) >= value);
  console.log(result);
};

create();
edit("006");
deleteElem("005");
replace("000");
filterElem(85);

//Funciones puras
//Los valores de retorno de la función son idénticos para argumentos idénticos.
