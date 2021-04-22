console.log("ABM");

const users = [
  { id: "000", name: "maria", score: "50" },
  { id: "001", name: "Jose", score: "60" },
  { id: "002", name: "Alejandra", score: "70" },
  { id: "003", name: "Alberto", score: "45" },
];

//crear (A)
const create = () => {
  users.push({ id: "004", name: "clara", score: "85" });
  users.unshift(
    { id: "005", name: "Antonio", score: "85" },
    { id: "006", name: "Lucia", score: "85" }
  );
  users.splice(1, 0, { id: "007", name: "Matias", score: "70" });
};

//editar
const edit = (id) => {
  //   const user = users[0];
  //   user.score = "90";
  const user = users.find((user) => user.id === id);
  user.score = "75";
  //console.log(user);
};

//eliminar
const deleteElem = (id) => {
  const user = users.findIndex((user) => user.id === id);
  console.log(user, "Posicion");
  users.splice(user, 1);
};

//reemplazo
const replace = (id) => {
  const user = users.findIndex((user) => user.id === id);
  users.splice(user, 1, { id: "00x", name: "Priscila", score: "100" });
};

//filter
const filterUser = (value) => {
  const result = users.filter((user) => Number(user.score) >= value);
  console.log(`Los estudiantes con nota mayor o igual a ${value}`);
  console.log(result);
};

create();
edit("002");
deleteElem("001");
replace("006");
filterUser(85);

console.log(users);
