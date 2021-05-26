debugger;
let menuListadoAuto  = document.querySelector('#menuListadoAuto');
let menuAgregarAuto  = document.querySelector('#menuAgregarAuto');
let mainFrame = document.querySelector('#mainFrame');



const mostrarListadoProductos = (event) => {
    event.preventDefault();
    mainFrame.src = "listado/listado.html";
};

const mostrarAgregarProducto = (event) => {
    event.preventDefault();
    window.localStorage.setItem("id", 0)
    mainFrame.src = "producto/producto.html";
};
const mostrarHome = (event) => {
    event.preventDefault();
    mainFrame.src='home.html'
};

menuListadoAuto.addEventListener('click',mostrarListadoProductos);
menuAgregarAuto.addEventListener('click',mostrarAgregarProducto);