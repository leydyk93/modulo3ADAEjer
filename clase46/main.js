//Resolviendo ejercicios
//Crear una función sumarImparesHasta
const sumarImparesHasta = (numero) => {
  let suma = 0;
  for (i = 1; i <= numero; i++) {
    if (i % 2 !== 0) {
      suma += i;
    }
  }
  console.log(`resultado para ${numero} es: `, suma);
};

//test de la funcion

const test = () => {
  let x = 1;
  while (x <= 25) {
    sumarImparesHasta(x);
    x++;
  }
};

test();

//cuenta regresiva  3 // [3, 2, 1, 0]

const crearCuentaRegresiva = (numeroInicial) => {
  let array = [];
  for (i = numeroInicial; i >= 0; i--) {
    array.push(i);
  }
  console.log(`Para ${numeroInicial}: `, array);
};

const testCuentaRegresiva = () => {
  let x = 1;
  while (x <= 25) {
    crearCuentaRegresiva(x);
    x++;
  }
};

testCuentaRegresiva();

// Es subconjunto

const esSubconjunto = (subconjunto, conjunto) => {
  if (subconjunto.length > conjunto) {
    console.log("No es subconjunto", subconjunto, conjunto);
    return false;
  }
  let cont = 0;
  for (i = 0; i < subconjunto.length; i++) {
    for (j = 0; j < conjunto.length; j++) {
      if (subconjunto[i] === conjunto[j]) {
        cont++;
      }
    }
  }
  if (cont >= subconjunto.length) {
    console.log("si es subconjunto", subconjunto, conjunto, cont);
    return true;
  }
  console.log("No es subconjunto", subconjunto, conjunto, cont);
  return false;
};
esSubconjunto([1], [1, 2, 3]); // true
esSubconjunto([1, 2, 3], [1, 2, 3, 4, 5]); // true
esSubconjunto([27, 49, 54], [54, 27, 8, 27, 49]); // true
esSubconjunto([1, 2, 3], [1, 2]); // false
esSubconjunto([1], [2, 3, 4]); // false

//Crear una función hayBloque que tome como
//array [1, 1, 1, 2, 3]
//    k  0  1  2  3  4
//tiene un bloque de 3 o más ítems consecutivos idénticos

const tieneBloque = (array) => {
  if (array.length < 3) {
    return false;
  }
  let contBloque = 0;
  for (i = 0; i < array.length; i++) {
    let k = i;
    let valueActual = array[i];
    contBloque = 0;
    let cont = 0;
    while (k < array.length && contBloque < 3 && cont < 3) {
      if (valueActual === array[k]) {
        contBloque++;
      }
      k++;
      cont++;
    }
    if (contBloque === 3) {
      console.log("tiene bloque", contBloque);
      return true;
    }
  }
  console.log("No tiene bloque", contBloque);
  return false;
};

tieneBloque([1, 2, 3]); // false
tieneBloque([1, 1, 1, 2, 3]); // true
tieneBloque([1, 2, 3, 3, 3]); // true
tieneBloque([1, 2, 3, 3, 3, 8]); // true
tieneBloque([1, 2, 2, 3, 3, 4]); // false

//Es palindromo
const esPalindromo = (palabra) => {
  palabra = palabra.replaceAll(" ", "");
  let palabraArray = palabra.split("");
  palabraArray.reverse();
  let resultCadena = palabraArray.join("");
  console.log(palabraArray, resultCadena);
  if (palabra.toLowerCase() === resultCadena.toLowerCase()) {
    console.log(`Es palindromo ${palabra}: `, resultCadena);
    return true;
  }
  console.log(`No es palindromo ${palabra}: `, resultCadena);
  return false;
};

esPalindromo("ada");
esPalindromo("reconocer");
esPalindromo("mama");
esPalindromo("javascript");
esPalindromo("hola como estas");
esPalindromo("anita lava la tina");
