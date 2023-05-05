//1.Capturo input presupuesto y btnCalcular
let inputPresupuesto = document.getElementById("inputPresupueto");
let btnCalcular = document.getElementById("btnCalcular");
let presupuesto = document.getElementById("presupuesto");
let totalGastos = document.getElementById("totalGastos");
let saldo = document.getElementById("saldo");

//2.Doy vida al btnCalcular, muestro y seteo presupuesto en pantalla con formato, OJOO pasar a STRING para usar el replace
btnCalcular.addEventListener('click', function(){
    presupuesto.innerHTML = inputPresupuesto.value.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    let nuevoSaldo = String(inputPresupuesto.value - totalGastos.innerText);
    saldo.innerText = nuevoSaldo.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");

})

//3.Capturo input gasto y btnAnadir
let inputNombreGasto = document.getElementById("inputNombreGasto");
let inputMontoGasto = document.getElementById("inputMontoGasto");
let btnAnadir = document.getElementById("btnAnadir");


