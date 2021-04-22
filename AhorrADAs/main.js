const options = document.getElementsByClassName("navbar-item");
const sections = document.getElementsByTagName("section");
const categoriesSelec = document.getElementById("new-op-categories");
const listCategories = document.getElementById("categories-list");
const inputNewCategory = document.getElementById("category-input-new");

const formNewOperation = document.querySelectorAll(
  "input[data-owner], select[data-owner]"
);
const listOperations = document.getElementById("operations");

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

const categories = [
  { id: "0", name: "Servicios" },
  { id: "1", name: "Trasporte" },
  { id: "2", name: "Educación" },
  { id: "3", name: "Trabajo" },
  { id: "4", name: "Comida" },
];

let operations = [];

// categories operations
const addCategories = () => {
  console.log("ejemplo");
  console.log(inputNewCategory.value);
  if (inputNewCategory.value != "") {
    console.log(categories.length, "nuevo id es");
    categories.unshift({ id: categories.length, name: inputNewCategory.value });
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
  tagsCategories = "";
  categories.forEach((category) => {
    let node = `
    <div class="columns">
      <div class="column">
        <span class="tag is-info is-light is-medium">${category.name}</span>
      </div>
      <div class="column">
        <div class="buttons">
          <button class="button is-white" onclick="editCategory(${category.id})">Editar</button>
          <button class="button is-white" onclick="deleteCategory(${category.id})">Eliminar</button>
        </div>
      </div>
    </div>
  `;
    tagsCategories += node;
  });
  listCategories.innerHTML = tagsCategories;
};

// new operations
const setValueCategoriesSelect = () => {
  categoriesSelec.innerHTML = "";
  categories.forEach(
    (category, index) =>
      (categoriesSelec.options[index] = new Option(category.name, category.id))
  );
};

//Operaciones
const addOperation = () => {
  let operation = {};
  console.log(formNewOperation);
  for (let i = 0; i < formNewOperation.length; i++) {
    operation["id"] = operations.length;
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
      let itemsOperations = "";
      operations.forEach((operation) => {
        let node = `<div class="columns has-text-weight-medium is-mobile">
        <div class="column">${operation.description}</div>
        <div class="column">
          <span class="tag is-info is-light is-medium"
            >${operation.category}</span
          >
        </div>
        <div class="column">${operation.monto}</div>
        <div class="column">${operation.date}</div>
        <div class="column">
          <button class="button is-success is-inverted is-small"  onclick="editOperation(${operation.id})">
            <i class="far fa-edit"></i>
          </button>
          <button class="button is-danger is-inverted is-small" onclick="deleteOperation(${operation.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;
        itemsOperations += node;
      });
      listOperations.innerHTML = itemsOperations;
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
  console.log(id, "Quiero editar");
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
