const options = document.getElementsByClassName("navbar-item");
const sections = document.getElementsByTagName("section");
const categoriesSelec = document.getElementById("new-op-categories");
const categoriesEdit = document.getElementById("edit-op-categories");
const listCategories = document.getElementById("categories-list");
const inputNewCategory = document.getElementById("category-input-new");

const formElementsNewOperation = document.querySelectorAll(
  "#new-operation input[data-owner], #new-operation select[data-owner]"
);
const formNewOperation = document.getElementById("form-new-operation");
const listOperations = document.getElementById("operations");

const formElementsEditOperation = document
  .querySelector("#edit-operation")
  .querySelectorAll("input[data-owner], select[data-owner]");

const totalesCategoryReport = document.getElementById(
  "report-total-categories"
);
const reportResumen = document.getElementById("report-resumen");

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
let reportsSections = {
  resumen: [],
  totalesCategory: [],
  totalesMes: [],
};

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
const showFormNewOperation = () => {
  formNewOperation.reset();
  controlVisibility("new-operation");
};

const addOperation = () => {
  let operation = {};
  console.log("Este es form new operation", formElementsNewOperation);
  for (let i = 0; i < formElementsNewOperation.length; i++) {
    operation["id"] = generateId();
    console.log(
      "nombre de la propiedad: ",
      formElementsNewOperation[i].getAttribute("name"),
      "valor",
      formElementsNewOperation[i].value
    );
    operation[formElementsNewOperation[i].getAttribute("name")] =
      formElementsNewOperation[i].value;
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
  for (let i = 0; i < formElementsEditOperation.length; i++) {
    formElementsEditOperation[i].value =
      operationEditar[formElementsEditOperation[i].getAttribute("name")];
    // console.log(
    //   formElementsEditOperation[i].getAttribute("name"),
    //   operationEditar[formElementsEditOperation[i].getAttribute("name")]
    // );
  }
};

const confirmEditOperation = () => {
  // let operation = {};
  //if (Object.keys(operationEditar).length !== 0) {
  //console.log(operationEditar);
  for (let i = 0; i < formElementsEditOperation.length; i++) {
    operationEditar[formElementsEditOperation[i].getAttribute("name")] =
      formElementsEditOperation[i].value;
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

//reports
generateReports = () => {
  controlVisibility("reports");
  let totalReportCategory = [];
  categories.forEach((category) => {
    let itemReport = {
      category: category.name,
      ganancia: 0,
      gasto: 0,
      balance: 0,
    };
    operations.forEach((operation) => {
      if (category.name === operation.category) {
        if (operation.type === "Gasto") {
          itemReport.gasto += parseFloat(operation.monto);
        }
        if (operation.type === "Ganancia") {
          itemReport.ganancia += parseFloat(operation.monto);
        }
      }
    });
    itemReport.balance = itemReport.ganancia - itemReport.gasto;
    totalReportCategory.push(itemReport);
  });
  reportsSections.totalesCategory = totalReportCategory;
  console.log(totalReportCategory);

  let maxGanancia = getMaximosCategory("ganancia");
  let maxGasto = getMaximosCategory("gasto");
  let maxBalance = getMaximosCategory("balance");

  reportsSections.resumen.push({
    title: "Categoría con mayor ganancia",
    category: maxGanancia.category,
    monto: maxGanancia.ganancia,
  });
  reportsSections.resumen.push({
    title: "Categoría con mayor gasto",
    category: maxGasto.category,
    monto: maxGasto.gasto,
  });
  reportsSections.resumen.push({
    title: "Categoría con mayor balance",
    category: maxBalance.category,
    monto: maxBalance.balance,
  });
  console.log(reportsSections.resumen);
  paintReports();
};

const getMaximosCategory = (campo) => {
  return reportsSections.totalesCategory.reduce((prev, current) =>
    prev[campo] > current[campo] ? prev : current
  );
};

paintReports = () => {
  totalesCategoryReport.innerHTML = "";
  reportsSections.totalesCategory.forEach((category) => {
    let node = document.createElement("div");
    node.innerHTML = `
    <div class="columns has-text-weight-medium is-mobile">
    <div class="column">${category.category}</div>
    <div class="column">${category.ganancia}</div>
    <div class="column">${category.gasto}</div>
    <div class="column">${category.balance}</div>
  </div>
  `;
    totalesCategoryReport.appendChild(node);
  });

  reportResumen.innerHTML = "";
  reportsSections.resumen.forEach((resumen) => {
    let node = document.createElement("div");
    node.innerHTML = `
    <div class="columns has-text-weight-medium is-mobile">
      <div class="column">${resumen.title}</div>
      <div class="column">
        <span class="tag is-info is-light is-medium">${resumen.category}</span>
      </div>
      <div class="column">${resumen.monto}</div>
    </div>
  `;
    reportResumen.appendChild(node);
  });
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
