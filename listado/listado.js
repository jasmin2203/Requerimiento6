
import { categoriaAPI } from "../constantes.js"
import { productoAPI } from "../constantes.js"
let textoProducto = document.querySelector("#textoProducto");
let buscarProducto = document.querySelector("#buscar");
let contenidoTabla = document.querySelector("#contenido");
let selectCategoria = document.querySelector("#categoria");
let body = document.querySelector("body");

const categoriaOption = (event) => {
    event.preventDefault();    

fetch(`${categoriaAPI}?Categoria=${categoria}`)
.then(response => response.json())
.then(data => {
    data.categorias.forEach(element => {
        selectCategoria.innerHTML += `<option>${element}</option>`;
    })  
})
}


const obtenerDatosAPI =(event)=>{
    event.preventDefault()
    let producto = textoProducto.value;
    let Categoria = selectCategoria.value;


    fetch(`${productoAPI}?Nombre=${producto}&Categoria=${Categoria}`)
        .then(respuesta => respuesta.json())
        .then( data =>
                llenarTabla(data))
}


const llenarTabla = ((data, index) => {
    let contenido = "";
    contenidoTabla.innerHTML = "";

    data.forEach(producto => {        
        contenido += 
        `<tr>
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${formatoDinero(producto.precio)}</td> 
            <td>${producto.proveedor}</td>
            <td><button value=${producto.codigo} class="boton-eliminar" ><i class="fas fa-trash""></i></button>
            <button class="boton-modificar" value=${producto.codigo}><i class="fas fa-edit"></i></button></td>
        </tr>`
    });
    contenidoTabla.innerHTML = contenido
})


const formatoDinero =(monto) => {
    return monto.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }


const eliminarProducto = (event) => {

    event.preventDefault();

    if (event.target.className == 'boton-eliminar') {

        let confirmado = window.confirm("¿Esta seguro que desea eliminar este producto ?");

        if (confirmado) {

            fetch(`${urlAPI}/${event.target.value}`,
                {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    buscarAuto(event);
                })
                .catch(errot => {
                    alert("Error al eliminar")
                })
        }
        else {
            alert("auto no eliminado");
        }
    }
}



const modificarProducto =(event) => {
    event.preventDefault();

    if (event.target.className == 'boton-modificar') {
        window.location.href ="../producto/producto.html";
    }
}


window.addEventListener('load', categoriaOption);
body.addEventListener('click', eliminarProducto);
body.addEventListener('click', modificarProducto);
botonBuscar.addEventListener('click',obtenerDatosAPI);