//# Votar
const puedeVotar = (edad) =>{
    if(edad < 18){
        console.log("No puede Votar");
    }else{
        console.log("Puede Votar")
    }
}

puedeVotar(20);
puedeVotar(18);
puedeVotar(17);

// sueldo
const calcularSueldo = (horasTrabajas, valorHora) =>{
    let sueldo = 0;
    if(horasTrabajas > 40){
        sueldo = valorHora*(2*horasTrabajas - 40)
    }else{
        sueldo = valorHora*horasTrabajas
    }

    console.log(`su sueldo es: ${sueldo}`)
}

calcularSueldo(50, 10); //40*10 + 10*20
calcularSueldo(30, 10); // 30*10

//ganancia por ventas 

const calcularPrecioVenta = (nroPantalones, costoTela, modelo, talla) =>{
    let total = 0;
    let costoProduccion = 0;
    let ganancia = 0;
    let manoObra = 0;
    let adicional = 0;
    let costoTotal = 0;
    if(modelo === 'A'){
        costoProduccion = 1.50*costoTela*nroPantalones;
        manoObra = costoProduccion*0.80;
    }

    if(modelo === 'B'){
        costoProduccion = 1.80*costoTela*nroPantalones;
        manoObra = costoProduccion*0.95;
    }

    if(talla === 32 || talla === 36){
        adicional = manoObra*0.04
    }

    costoTotal = costoProduccion + manoObra + adicional 
    ganancia = costoTotal*0.30
    total = costoTotal + ganancia

    let valorUnitario = total/nroPantalones;

    console.log(`Los costos totales: ${costoTotal}`)
    console.log(`La ganancia es: ${ganancia}`)
    console.log(`El precio de venta unitario: ${valorUnitario}`)
}

console.log("modelo A talla 30")
calcularPrecioVenta(100, 200,'A', 30)

console.log("modelo A talla 32")
calcularPrecioVenta(100, 200,'A', 32)

console.log("modelo B talla 30")
calcularPrecioVenta(100, 200,'B', 30)

console.log("modelo B talla 36")
calcularPrecioVenta(100, 200,'B', 36)

