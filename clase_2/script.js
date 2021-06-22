//VARIABLES GLOBALES
const Formulario = document.getElementById("formulario");
const Listado = document.getElementById("lista");


//BASE DE DATOS
const DB = {

    tareas: JSON.parse(localStorage.getItem('tareas')) || [],

    agregar: function (tarea) {
        let posicion;
        this.tareas.find((tar, i) => {
            if (tar.titulo === tarea.titulo) {
                posicion = i;
            }
        })
        console.log(posicion);
        if (posicion != undefined) {
            this.tareas[posicion] = tarea;
        } else {
            this.tareas.unshift(tarea);
        }

        this.guardar();
    },

    consultar: function (titulo) {
        if (!titulo) {
            return this.tareas;
        }
        let posicion;
        this.tareas.find((tarea, i) => {
            if (tarea.titulo === titulo) {
                posicion = i;
            }
        })
        return this.tareas[posicion];
    },

    guardar: function () {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    },

    borrar: function (titulo) {
        let posicion;
        this.tareas.find((tarea, i) => {
            if (tarea.titulo === titulo) {
                posicion = i;
            }
        })
        this.tareas.splice(posicion, 1);
        this.guardar();
    }

}


//FUNCIONES
function guardar(e) {

    let data = e.target

    let esImportante = data.querySelector('#importante').checked;
    let titulo = data.querySelector('#titulo').value;
    let descripcion = data.querySelector('#descripcion').value;
    let tiempo = data.querySelector('input[name="tiempo"]:checked').value;

    let tarea = { esImportante, titulo, descripcion, tiempo }

    DB.agregar(tarea);
    data.reset();
    listar();

    if (document.querySelector("#editando")){
        document.querySelector("#editando").remove();
    }
}

function listar() {
    let tareas = DB.consultar();
    Listado.innerHTML = "";
    tareas.forEach(element => {
        let tarea = crearTarea(element);
        Listado.appendChild(tarea);
    });
}

function crearTarea(tarea) {
    let tareaDiv = document.createElement("div");
    tareaDiv.setAttribute("class", "tarea");
    tareaDiv.setAttribute("id", tarea.titulo)

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
    hecho.setAttribute("onclick", "hecho(this)");
    hecho.innerText = "check";
    tareaBotones.appendChild(hecho);

    let editar = document.createElement("span");
    editar.setAttribute("class", "material-icons boton editar");
    editar.setAttribute("onclick", "editar(this)");
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

    let titulo = e.parentElement
        .parentElement
        .parentElement
        .querySelector(".tarea-titulo")
        .innerText;

    DB.borrar(titulo)

    listar();

}

function editar(e) {
    let titulo = e.parentElement
        .parentElement
        .parentElement
        .querySelector(".tarea-titulo")
        .innerText;

    let tarea = DB.consultar(titulo);

    let editando = document.createElement("p");
    editando.setAttribute("id", "editando");
    editando.innerText = "EDITANDO";


    let edImportante = Formulario.querySelector('#importante');
    let edTitulo = Formulario.querySelector('#titulo');
    let edDescripcion = Formulario.querySelector('#descripcion');
    let edTiempo = Formulario.querySelector(`#t${tarea.tiempo}`);

    edImportante.checked = tarea.esImportante;
    edTitulo.value = tarea.titulo;
    edDescripcion.value = tarea.descripcion;
    edTiempo.checked = true;

    edImportante.parentElement.parentElement.appendChild(editando);
}

function hecho(e) {
    let titulo = e.parentElement
        .parentElement
        .parentElement
        .querySelector(".tarea-titulo")
        .innerText;

    console.log("Hecho", titulo);

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

    guardar(e);
})
