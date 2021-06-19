//VARIABLES GLOBALES
const Formulario = document.getElementById("formulario");
const Listado = document.getElementById("lista");



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
        tareas.forEach(tarea => {
            let item = document.createElement("div");
            item.className = "tarea";

            item.innerHTML = `
            <div class="tarea-cabecera">
                <p class="tarea-titulo">${tarea.titulo}</p>
                <span class="material-icons tarea-importante ${tarea.esImportante ? '' : 'oculta'}"> priority_high </span>
                <p class="tarea-tiempo"> ${tarea.tiempo}m</p>
            </div>
            <div class="tarea-cuerpo no-visible">
                <p class="tarea-descripcion">${tarea.descripcion}</p>
                <div class="tarea-botones">
                    <span id="hecho" class="material-icons boton"> check </span>
                    <span id="editar" class="material-icons boton"> edit </span>
                    <span id="borrar" class="material-icons boton" onclick="borrar(this)"> delete </span>
                </div>
            </div>
            <span class="material-icons tarea-expandir boton" onclick="expandir(this)">expand_more</span>`;
            Listado.appendChild(item);
        })
    }
}

function borrar(e) {
    let tituloTarea = e.parentElement
        .parentElement
        .parentElement
        .querySelector(".tarea-titulo")
        .innerText;

    let tareas = JSON.parse(localStorage.getItem('tareas'));

    let posicion = tareas.find((tarea, i) =>{
        if (tarea.titulo === tituloTarea){
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
        cuerpo.nextSibling.nextSibling.innerText = "expand_more";
    } else {
        cuerpo.classList.remove("no-visible");
        cuerpo.classList.add("visible");
        cuerpo.nextSibling.nextSibling.innerText = "expand_less";
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
