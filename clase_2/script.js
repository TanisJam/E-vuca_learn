//VARIABLES GLOBALES
const Formulario = document.getElementById("formulario");
const Listado = document.getElementById("lista");

//BASE DE DATOS

const DB = {

    tareas: JSON.parse(localStorage.getItem('tareas')) || [],

    agregar: function (tarea) {
        tareas.unshift(e);
        this.guardar;
    },

    cosultar: function () {
        return this.tareas;
    },

    guardar: function(){
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

}

console.log(DB.tareas);

//FUNCIONES
function guardar(e) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    if (tareas) {
        tareas.unshift(e);
    } else {
        tareas = [];
        tareas.push(e);
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function listar() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    if (tareas) {
        Listado.innerHTML = "";

        tareas.forEach(element => {
            let tarea = crearTarea(element);
            Listado.appendChild(tarea);
        });
    }
}

function crearTarea(tarea) {
    let tareaDiv = document.createElement("div");
    tareaDiv.setAttribute("class", "tarea");

    let tareaCabecera = document.createElement("div");
    tareaCabecera.setAttribute("class", "tarea-cabecera");

    let tareaTitulo = document.createElement("p");
    tareaTitulo.setAttribute("class", "tarea-titulo");
    tareaTitulo.innerText = tarea.titulo;
    tareaCabecera.appendChild(tareaTitulo);

    let tareaTiempo = document.createElement("p");
    tareaTiempo.setAttribute("class", "tarea-tiempo");
    tareaTiempo.innerText = tarea.tiempo;
    tareaCabecera.appendChild(tareaTiempo);


    if (tarea.esImportante) {
        let tareaImportante = document.createElement("span");
        tareaImportante.setAttribute("class", "material-icons tarea-importante");
        tareaImportante.innerText = "priority_high";
        tareaCabecera.appendChild(tareaImportante);
    }
    tareaDiv.appendChild(tareaCabecera);


    let tareaCuerpo = document.createElement("div");
    tareaCuerpo.setAttribute("class", "tarea-cuerpo no-visible");

    let tareaDescripcion = document.createElement("p");
    tareaDescripcion.setAttribute("class", "tarea-descripcion");
    tareaDescripcion.innerText = tarea.descripcion;
    tareaCuerpo.appendChild(tareaDescripcion);

    let tareaBotones = document.createElement("div");
    tareaBotones.setAttribute("class", "tarea-botones");
    let hecho = document.createElement("span");
    hecho.setAttribute("class", "material-icons boton hecho");
    hecho.innerText = "check";
    tareaBotones.appendChild(hecho);

    let editar = document.createElement("span");
    editar.setAttribute("class", "material-icons boton editar");
    editar.innerText = "edit";
    tareaBotones.appendChild(editar);

    let borrar = document.createElement("span");
    borrar.setAttribute("class", "material-icons boton borrar");
    borrar.setAttribute("onclick", "borrar(this)");
    borrar.innerText = "delete";
    tareaBotones.appendChild(borrar);

    tareaCuerpo.appendChild(tareaBotones);

    tareaDiv.appendChild(tareaCuerpo);

    let tareaExpandir = document.createElement("span");
    tareaExpandir.setAttribute("class", "material-icons tarea-expandir");
    tareaExpandir.setAttribute("onclick", "expandir(this)");
    tareaExpandir.innerText = "expand_more";

    tareaDiv.appendChild(tareaExpandir);

    return tareaDiv;
}

function borrar(e) {
    let tituloTarea = e.parentElement
        .parentElement
        .parentElement
        .querySelector(".tarea-titulo")
        .innerText;

    let tareas = JSON.parse(localStorage.getItem('tareas'));

    let posicion = tareas.find((tarea, i) => {
        if (tarea.titulo === tituloTarea) {
            return i;
        }
    })

    tareas.splice(posicion, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    listar();

}

let expandir = (e) => {
    let cuerpo = e.parentElement.querySelector(".tarea-cuerpo");
    let seMuestra = cuerpo.classList.contains("visible");
    if (seMuestra) {
        cuerpo.classList.remove("visible");
        cuerpo.classList.add("no-visible");
        cuerpo.nextSibling.innerText = "expand_more";
    } else {
        cuerpo.classList.remove("no-visible");
        cuerpo.classList.add("visible");
        cuerpo.nextSibling.innerText = "expand_less";
    }
}




//EVENT LISTENERS

window.onload = listar;

Formulario.addEventListener('submit', e => {
    e.preventDefault();

    let data = e.target

    let esImportante = data.querySelector('#importante').checked;
    let titulo = data.querySelector('#titulo').value;
    let descripcion = data.querySelector('#descripcion').value;
    let tiempo = data.querySelector('input[name="tiempo"]:checked').value;

    let tarea = {
        esImportante,
        titulo,
        descripcion,
        tiempo
    }

    guardar(tarea);
    data.reset();
    listar();
})
