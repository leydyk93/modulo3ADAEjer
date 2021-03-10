const tab = document.getElementById("tablero");
const texto = document.getElementById("texto");

let items = ["😜", "🍉", "🥥", "🍋", "🥝", "🍒", "🍑", "🐶", "🪀"];
let level = 4;
let contTime = 0;
let process;
let timeJuego = 30;
let tabMirror = [];

let positionSelected = []; //origen, destino

const controTiempo = () => {
  clearInterval(process);
  texto.innerHTML = 0;
  cont = timeJuego;
  process = setInterval(() => {
    if (cont > 0) {
      cont--;
      texto.innerHTML = cont;
    } else {
      finJuego();
    }
  }, 1000);
};

const finJuego = () => {
  alert("El juego ha terminado, lo reiniciare automaticamente");
  clearInterval(process);
  controTiempo();
};

const createTablero = (level) => {
  tab.innerHTML = "";
  for (let i = 0; i < level; i++) {
    tabMirror[i] = [];
    for (let j = 0; j < level; j++) {
      const newDiv = document.createElement("p");
      newDiv.setAttribute("id", `${i}-${j}`);
      let value = items[getRandomInt(0, 7)];
      tabMirror[i][j] = value;
      newDiv.innerHTML = value;
      tab.appendChild(newDiv);
    }
  }
  addEventClickElement();
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const changeLevel = () => {
  if (level < 15) {
    level += 1;
  } else {
    level = 5;
  }
  createTablero(level);
  tab.style.width = `${50 * level}px`;
};

const addEventClickElement = () => {
  const elemt = document.getElementsByTagName("p");

  console.log(elemt);
  for (let i = 0; i < elemt.length; i++) {
    elemt[i].addEventListener("click", (elem) => {
      if (positionSelected.length > 1) {
        positionSelected = [];
      }
      positionSelected.push(elem.target.id);
      if (positionSelected.length === 2) {
        console.log(`posiciones:${positionSelected}`);
        intercambiarElementos();
      }
    });
  }
};

const intercambiarElementos = () => {
  let origen, destino;
  if (isAdyacente()) {
    contentOrigen = document.getElementById(positionSelected[0]).textContent;
    contentDestino = document.getElementById(positionSelected[1]).textContent;

    origen = document.getElementById(positionSelected[0]);
    destino = document.getElementById(positionSelected[1]);

    destino.innerText = contentOrigen;
    origen.innerText = contentDestino;

    console.log("Soy adyacente");
  } else {
    console.log("No soy adyacente");
  }
};

const isAdyacente = () => {
  const pos = positionSelected[0].split("-"); //origen
  const x = pos[0];
  const y = pos[1];
  console.log(x, y);
  console.log(`${positionSelected[0]} posibles movimientos: 
  ${Number(x) - 1}-${y}, 
  ${Number(x) + 1}-${y},
  ${x}-${Number(y) - 1},
  ${x}-${Number(y) + 1}
  `);
  if (
    positionSelected[1] === `${Number(x) - 1}-${y}` || //arriba
    positionSelected[1] === `${Number(x) + 1}-${y}` || //abajo
    positionSelected[1] === `${x}-${Number(y) - 1}` || //izquierda
    positionSelected[1] === `${x}-${Number(y) + 1}` //derecha
  ) {
    return true;
  }
  return false;
};

//inicio de juego
// controTiempo();
createTablero(level);
