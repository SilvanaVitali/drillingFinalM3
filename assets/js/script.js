/*
[x]boton Calcular
    [x]acceder a elementos del DOM
        [x]boton calcular
        [x]input del presupuesto
        [x]presupuesto del resumen
        [x]saldo
        [x]gasto
    []funcion al dar click en el boton calcular
        [x]capturar el monto presupuesto
            [x]actualizo monto del presupuesto en resumen
        [x]actualiza el resumen del presupuesto***
            [x]calculo del saldo = presupuesto - gasto
    [x]habilitar boton de añadir gasto cuando ingrese un presupuesto

[x]boton añadir gasto
    [x]acceder a elementos del DOM
        [x]boton añadir gasto
        [x]input nombre gasto
        [x]input monto gasto
        [x]tabla
    [x] funcion al dar click en boton
        [x]capturar los datos del gatos
            [x]crear un nuevo Gasto{} segun el input y agregar al array
                [x]crear constructor del objeto Gasto{}
                [x]crear un array []
            [x]actualizar total gastos del resumen
        [x]actualiza resumen presupuesto***
                [x]calculo del saldo = presupuesto - gasto
        [x]actualiza tabla
            [x]agregar una fila con el detalle del gasto + icono eliminar

[x]boton eliminar
    [x] funcion al dar click en icono
        [x]eliminar un objeto gasto del array
        [x]actualiza tabla
        [x]actualiza mnto de la suma total de los gastos
        [x]actualiza saldo
*/

//4.1 Crea constructor del objeto Gasto
function Gasto(nombre,monto){
    this.nombre = nombre;
    this.monto = monto;
};

//4.2 array de gastos
let listaGastos = [];

//4.3 funcion para agregar un gasto con los input y agregar al array
function agregarGasto(nombre,monto) {
    let gasto = new Gasto(nombre,monto);
    listaGastos.push(gasto);
    let computoSaldo = actualizarSaldo();
    if(computoSaldo < 0){
        listaGastos.pop();
        alert("Eres paaaavree, no podi gastar ma xD")
    } else {
        let gastoActualizado = listaGastos.reduce((acumulador,valorActual) => acumulador + valorActual.monto, 0);
        totalGastos.innerHTML = String(gastoActualizado).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    actualizarSaldo();
}

//4.4 actualizar tabla, usando interpolacion
function actualizarTabla(){
    let html = "";
    listaGastos.forEach((gasto,index) => {
        html += `
        <tr>
            <td>${gasto.nombre}</td>
            <td>${gasto.monto}</td>
            <td style="cursor: pointer;"><i class="fa-solid fa-trash" onclick="eliminar(${index})"></i></td>
        </tr>
        `
    })
    bodyTabla.innerHTML = html;
    actualizarSaldo();
}


//5. funcion icono eliminar
function eliminar(index){
    listaGastos = listaGastos.filter((gasto,indice) => indice != index);
    let gastoActualizado = listaGastos.reduce((acumulador,valorActual) => acumulador + valorActual.monto, 0);
    totalGastos.innerHTML = String(gastoActualizado).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    actualizarTabla();
}


//2.1 funcion para actualizar el saldo
function actualizarSaldo(){
    let pptoResumen = presupuesto.innerHTML.replaceAll(".","");
    let gastosResumen = listaGastos.reduce((acumulador,valorActual) => acumulador + valorActual.monto,0);
    let nuevoSaldo = String(pptoResumen - gastosResumen);
    saldo.innerText = nuevoSaldo.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return nuevoSaldo;
}

//1. Acceder a elementos del DOM
let btnCalcular = document.getElementById("btnCalcular");
let inputPresupueto = document.getElementById("inputPresupueto");
let presupuesto = document.getElementById("presupuesto");
let totalGastos = document.getElementById("totalGastos");
let saldo = document.getElementById("saldo");
let btnAnadir = document.getElementById("btnAnadir");

//2. Agrego funcion al btn calcular
btnCalcular.addEventListener('click', function() {
    presupuesto.innerHTML = inputPresupueto.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    actualizarSaldo();
    presupuesto.innerHTML > 0 ? btnAnadir.removeAttribute("disabled") : btnAnadir.setAttribute("disable",true);
})

//3. accedo al DOM
let inputNombreGasto = document.getElementById("inputNombreGasto");
let inputMontoGasto = document.getElementById("inputMontoGasto");
let bodyTabla = document.getElementById("bodyTabla");

//4. agrego funcion al btnAnadir
btnAnadir.addEventListener('click', function() {
    let nombre = inputNombreGasto.value;
    let monto = parseInt(inputMontoGasto.value);
    agregarGasto(nombre,monto);
    actualizarTabla();
})
