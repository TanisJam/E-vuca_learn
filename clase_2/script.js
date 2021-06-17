//VARIABLES GLOBALES
const Formulario = document.getElementById("formulario");
const Listado = document.getElementById("lista");
let lista = [];



//FUNCIONES
function guardar(e) {
    lista.unshift(e);
}

function listar() {
    if (lista) {
        Listado.innerHTML = "";
        lista.forEach(tarea => {
            let item = document.createElement("div");
            item.className = "tarea";

            item.innerHTML = `
            <div class="tarea-cabecera">
                <p class="tarea-titulo">${tarea.titulo}</p>
                <p class="tarea-tiempo"> ${tarea.tiempo}m</p>
                <span class="material-icons tarea-importante ${tarea.esImportante ? '' : 'oculta'}"> priority_high </span>
            </div>
            <div class="tarea-cuerpo">
                <p class="tarea-descripcion">${tarea.descripcion}</p>
                <div class="tarea-botones">
                    <span id="hecho" class="material-icons"> check </span>
                    <span id="editar" class="material-icons"> edit </span>
                    <span id="borrar" class="material-icons"> delete </span>
                </div>
            </div>
            <span class="material-icons tarea-expandir" onclick="expandir(this)">
                expand_less
            </span>`;
            Listado.appendChild(item);
        })
    }
}

let expandir = (e) => {
    let cuerpo = e.parentElement.querySelector(".tarea-cuerpo"); 
    let seMuestra = cuerpo.classList.contains("oculta");
    if (seMuestra){
        cuerpo.classList.remove("oculta");
    } else {
        cuerpo.classList.add("oculta");
    }
}




//EVENT LISTENERS
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