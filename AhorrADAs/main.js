const options = document.getElementsByClassName("navbar-item");
const sections = document.getElementsByTagName("section");
const categoriesSelec = document.getElementById("new-op-categories");
const listCategories = document.getElementById("categories-list");
const inputNewCategory = document.getElementById("category-input-new");

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

const main = () => {
  setValueCategoriesSelect();
  categoriesFromList();
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
