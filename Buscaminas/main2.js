let size = 3;
const content = ["💣", "💨"];
const VISTO = "👀";
const INICIAL = "📦";
const BOMBAEXPLOTA = "💥";
let tab = [];
let tabVisible = [];
let FinJuego = false;
let vaciosGenerados = 0; //cantidad de vacios generados
let vaciosDescubiertos = 0;

const createMatriz = () => {
  vaciosGenerados = 0;
  vaciosDescubiertos = 0;
  tab = [];
  tabVisible = [];
  for (let i = 0; i < size; i++) {
    tab[i] = [];
    tabVisible[i] = [];
    for (let j = 0; j < size; j++) {
      let value = content[getRandomInt(0, content.length)];
      tab[i][j] = value;
      if (value === content[1]) {
        vaciosGenerados++;
      }
      tabVisible[i][j] = INICIAL;
    }
  }
  console.log("Matriz valores");
  console.log("Vacios: ", vaciosGenerados);
  paintTab(tab);
  console.log("Matriz Juego");
  paintTab(tabVisible);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getPosition = () => {
  let position = prompt("Ingrese coordenada (fila, columna)");
  let coord = position ? position.split(",") : null;
  if (coord && coord.length > 0 && coord[0] < size && coord[1] < size) {
    discoverElement(coord[0], coord[1]);
  } else {
    alert("Es una coordenada inválida");
  }

  return position;
};

const discoverElement = (x, y) => {
  let value = tab[x][y];
  console.log(`${x}-${y}`, "seleccionada");
  if (value === "💣") {
    tabVisible[x][y] = BOMBAEXPLOTA;
    FinJuego = true;
    paintTab(tabVisible);
    console.log("Fin de Juego");
    alert("¡Oh no!¡Has encontrado una bomba!, FIN DE JUEGO");
    return;
  }
  if (value === VISTO) {
    alert("Coordenada ya seleccionada");
    return;
  }
  tabVisible[x][y] = value;
  tab[x][y] = VISTO;
  vaciosDescubiertos++;

  if (vaciosGenerados === vaciosDescubiertos) {
    FinJuego = true;
    alert("Ganaste, El juego ha terminado");
  }
  console.log(`value: ${value} desc: ${vaciosDescubiertos}`);
  paintTab(tabVisible);
};

const paintTab = (tab) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {}
    console.log(tab[i]);
  }
};

createMatriz();

const play = () => {
  if (FinJuego) {
    FinJuego = false;
    createMatriz();
  }
  console.log("Inicia el Juego");
  while (!FinJuego) {
    getPosition();
  }
};
