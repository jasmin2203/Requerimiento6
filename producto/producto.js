import { productoAPI } from "../constantes.js"
let btnAgregar = document.querySelector('#btnAgregar');
let textoCodigo = document.querySelector('#textoCodigo');
let textoNombre = document.querySelector('#textoNombre');
let listaCategoria = document.querySelector("#categoria");
let textoRuc = document.querySelector("#textoRuc");
let textoProveedor = document.querySelector("#textoProveedor");
let textoPrecio = document.querySelector('#textoPrecio');
let afectaDeImpuesto = document.querySelector("#afectaDeImpuesto");
let idProducto = 0;

const modificarProducto = () => {
    let codigo = textoCodigo.value;
    let nombre = textoNombre.value;
    let categoria = listaCategoria.value;
    let ruc =  textoRuc.value;
    let proveedor = textoProveedor.value;
    let precio = textoPrecio.value;
    let impuesto = afectaDeImpuesto.value

    let productosApi = {"codigo" : codigo, "nombre" : nombre, "categoria" : categoria, "ruc" : ruc, "proveedor" : proveedor, "precio" : precio, "afectoIGV" : impuesto}

    fetch(productoAPI + idProducto,
        {
            method: "PUT",
            body : JSON.stringify(productosApi),
            headers: {
                "Content-type" : "application/json"
            }
        })
        .then(repuesta => repuesta.text())
        .then(data => alert("Producto modificado"))
        .catch(error => {
            alert(error)
        })
}

const agregarProducto = () => {
    debugger
    let codigo = textoCodigo.value;
    let nombre = textoNombre.value;
    let categoria = listaCategoria.value;
    let ruc =  textoRuc.value;
    let proveedor = textoProveedor.value;
    let precio = textoPrecio.value;
    let impuesto = afectaDeImpuesto.value

    let productosApi = {"codigo" : codigo, "nombre" : nombre, "categoria" : categoria, "ruc" : ruc, "proveedor" : proveedor, "precio" : precio, "afectoIGV" : impuesto}

    fetch(productoAPI,
        {
            method: "POST",
            body : JSON.stringify(productosApi),
            headers: {
                "Content-type" : "application/json"
            }
        })
        .then(repuesta => repuesta.text())
        .then(alert("Producto creado "))
        .catch(error => {
            alert(error)
        })
}

const grabarDatos = (event) => {
    event.preventDefault()
    if(idProducto == 0){
        agregarProducto()
    }else{
        modificarProducto()
    }
}
const obtenerDatos = () => {
    idProducto = window.localStorage.getItem("id")
    
    fetch(productoAPI + idProducto)

    .then(respuesta => respuesta.json())

    .then(data => {

        textoCodigo.value = data.codigo
        textoNombre.value = data.nombre
        listaCategoria.value = data.categoria
        textoRuc.value = data.ruc
        textoProveedor.value = data.proveedor
        textoPrecio.value = data.precio
    })
    let titulo=document.querySelector("#titulo");
    if(idProducto==0){
        titulo.textContent="Ingreso Agregar producto";
    }
    else{
        titulo.textContent="Modificar Producto";
    }
}

btnAgregar.addEventListener("click", grabarDatos)
window.addEventListener("load", obtenerDatos)