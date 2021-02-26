const tab = document.getElementById("tablero");

let items = ["😜", "🍉", "🥥", "🍋", "🥝", "🍒", "🍑", "🐶", "🪀"];
let level = 4;

const createTablero = (level) => {
  tab.innerHTML = "";
  for (let i = 0; i < level; i++) {
    for (let j = 0; j < level; j++) {
      const newDiv = document.createElement("p");
      newDiv.setAttribute("id", `${i}-${j}`);
      newDiv.innerHTML = items[getRandomInt(0, 7)];
      tab.appendChild(newDiv);
    }
  }

  getElement();
};

function getRandomInt(min, max) {
  // console.log(`ramdom: `, ramdom);
  // console.log(`ramdom con floor`, Math.floor(ramdom));
  // console.log(`ramdom*(max-min)`, ramdom * (max - min));
  // console.log(`ramdom con floor y max y min`, Math.floor(ramdom * (max - min)));
  // console.log(
  //   `ramdom con floor max min y + min`,
  //   Math.floor(ramdom * (max - min)) + min
  // );
  return Math.floor(Math.random() * (max - min)) + min;
}

const changeLevel = () => {
  // level += 1;
  // console.log("soy level", level);
  // createTablero(level);
  // tab.style.width = `${50 * level}px`;
  if (level < 15) {
    level += 1;
  } else {
    level = 5;
  }
  createTablero(level);
  tab.style.width = `${50 * level}px`;
};

const getElement = () => {
  const elemt = document.getElementsByTagName("p");
  console.log(elemt);
  for (let i = 0; i < elemt.length; i++) {
    elemt[i].addEventListener("click", (elem) => {
      console.log(elem);
    });
  }
};

createTablero(level);