const options = document.getElementsByClassName("navbar-item");
const sections = document.getElementsByTagName("section");
const categoriesSelec = document.getElementById("new-op-categories");
const categoriesEdit = document.getElementById("edit-op-categories");
const listCategories = document.getElementById("categories-list");
const inputNewCategory = document.getElementById("category-input-new");

const formNewOperation = document.querySelectorAll(
  "#new-operation input[data-owner], #new-operation select[data-owner]"
);
const listOperations = document.getElementById("operations");

const formEditOperation = document
  .querySelector("#edit-operation")
  .querySelectorAll("input[data-owner], select[data-owner]");

console.log(sections, "Objecto");
const sectionsList = [...sections];

const controlVisibility = (page) => {
  sectionsList.forEach((section) => {
    if (section.id === page) {
      section.classList.remove("is-hidden");
    } else {
      section.classList.add("is-hidden");
    }
  });
  console.log(sectionsList);
};

const generateId = () => {
  let p1 = Math.floor(Math.random() * 0x10000).toString(16);
  //console.log(p1, p1.toString(16));
  let p2 = new Date().getTime();
  return `${p1}${p2}`;
};

const categories = [
  { id: "0", name: "Servicios" },
  { id: "1", name: "Trasporte" },
  { id: "2", name: "Educación" },
  { id: "3", name: "Trabajo" },
  { id: "4", name: "Comida" },
];

let operations = [];
let operationEditar = {};

// categories operations
const addCategories = () => {
  console.log("ejemplo");
  console.log(inputNewCategory.value);
  if (inputNewCategory.value != "") {
    categories.unshift({ id: generateId(), name: inputNewCategory.value });
    setValueCategoriesSelect();
    categoriesFromList();
    inputNewCategory.value = "";
  }
};

const editCategory = (category) => {
  // console.log(category, "quiero editar");
  // const value = inputNewCategory.value;
  // const categoryedit = categories.find((e) => e.id === category);
  // categoryedit.name = value;
};

const deleteCategory = (category) => {
  const value = categories.findIndex((e) => e.id == category);
  console.log(value, "quiero eliminar", category);
  if (value >= 0) {
    categories.splice(value, 1);
    console.log(categories);
    categoriesFromList();
    setValueCategoriesSelect();
  }
};

const categoriesFromList = () => {
  listCategories.innerHTML = "";
  //tagsCategories = "";
  categories.forEach((category) => {
    let node = document.createElement("div");
    node.innerHTML = `
    <div class="columns">
      <div class="column">
        <span class="tag is-info is-light is-medium">${category.name}</span>
      </div>
      <div class="column">
        <div class="buttons">
          <button class="button is-white">Editar</button>
          <button class="button is-white">Eliminar</button>
        </div>
      </div>
    </div>
  `;

    let optionsButtons = node.querySelectorAll(".button");
    optionsButtons[0].onclick = () => {
      editCategory(category.id);
    };
    optionsButtons[1].onclick = () => {
      deleteCategory(category.id);
    };
    listCategories.appendChild(node);
  });
};

// new operations
const setValueCategoriesSelect = () => {
  categoriesSelec.innerHTML = "";
  categories.forEach((category, index) => {
    categoriesSelec.options[index] = new Option(category.name, category.name);
    categoriesEdit.options[index] = new Option(category.name, category.name);
  });
};

//Operaciones
const addOperation = () => {
  let operation = {};
  console.log(formNewOperation);
  for (let i = 0; i < formNewOperation.length; i++) {
    operation["id"] = generateId();
    operation[formNewOperation[i].getAttribute("name")] =
      formNewOperation[i].value;
  }
  console.log(operation);
  operations.push(operation);
  addLocalStorage("operations", operations);
  listarOperations();
  controlVisibility("home");
};

const listarOperations = () => {
  listOperations.innerHTML = "";
  if (localStorage.getItem("operations")) {
    operations = getLocalStorage("operations");
    console.log(operations, "Operaciones desde localstorage");
    if (operations.length > 0) {
      //let itemsOperations = "";
      operations.forEach((operation) => {
        let node = document.createElement("div");
        node.innerHTML = `<div class="columns has-text-weight-medium is-mobile">
        <div class="column">${operation.description}</div>
        <div class="column">
          <span class="tag is-info is-light is-medium"
            >${operation.category}</span
          >
        </div>
        <div class="column">${operation.date}</div>
        <div class="column">${operation.monto}</div>
        <div class="column">
          <button class="button is-success is-inverted is-small" >
            <i class="far fa-edit"></i>
          </button>
          <button class="button is-danger is-inverted is-small" >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;

        let optionsButtons = node.querySelectorAll(".button");
        optionsButtons[0].onclick = () => {
          editOperation(operation.id);
        };
        optionsButtons[1].onclick = () => {
          deleteOperation(operation.id);
        };

        listOperations.appendChild(node);
      });
    }
  }
};

const deleteOperation = (id) => {
  console.log(id, "Quiero eliminar");
  const value = operations.findIndex((e) => e.id == id);
  console.log(value, "quiero eliminar", id);
  if (value >= 0) {
    operations.splice(value, 1);
    console.log(operations);
    addLocalStorage("operations", operations);
    listarOperations();
  }
};

const editOperation = (id) => {
  controlVisibility("edit-operation");
  console.log(id, "Quiero editar");
  operationEditar = operations.find((operation) => operation.id === id);
  console.log(operationEditar, "item a editar");
  for (let i = 0; i < formEditOperation.length; i++) {
    formEditOperation[i].value =
      operationEditar[formEditOperation[i].getAttribute("name")];
    // console.log(
    //   formEditOperation[i].getAttribute("name"),
    //   operationEditar[formEditOperation[i].getAttribute("name")]
    // );
  }
};

const confirmEditOperation = () => {
  // let operation = {};
  //if (Object.keys(operationEditar).length !== 0) {
  //console.log(operationEditar);
  for (let i = 0; i < formEditOperation.length; i++) {
    operationEditar[formEditOperation[i].getAttribute("name")] =
      formEditOperation[i].value;
  }

  const posOperation = operations.findIndex((e) => e.id === operationEditar.id);
  operations.splice(posOperation, 1, operationEditar);

  console.log(operations);
  addLocalStorage("operations", operations);
  listarOperations();
  controlVisibility("home");
};

const cancelar = () => {
  controlVisibility("home");
};

//local Storage
const addLocalStorage = (property, value) => {
  localStorage.setItem(property, JSON.stringify(value));
};

const getLocalStorage = (property) => {
  return JSON.parse(localStorage.getItem(property));
};

const main = () => {
  setValueCategoriesSelect();
  categoriesFromList();
  listarOperations();
};

main();

// Menu
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
