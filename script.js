/* ===================================================== */
/* script.js COMPLETO */
/* ===================================================== */



// =====================================================
// ESTUDIANTES
// =====================================================

function obtenerEstudiantes(){

return JSON.parse(
localStorage.getItem("estudiantes")
) || [];

}



function guardarEstudiantes(estudiantes){

localStorage.setItem(
"estudiantes",
JSON.stringify(estudiantes)
);

}



// =====================================================
// AGREGAR ESTUDIANTE
// =====================================================

function agregarEstudiante(){

const nombreInput =
document.getElementById("nombreEstudiante");

const codigoInput =
document.getElementById("codigoEstudiante");

if(!nombreInput || !codigoInput){

alert("No se encontraron los campos");
return;

}

const nombre =
nombreInput.value.trim();

const codigo =
codigoInput.value.trim();

if(nombre === "" || codigo === ""){

alert("Completa todos los campos");
return;

}

let estudiantes =
obtenerEstudiantes();

if(estudiantes.length >= 5){

alert("Solo se permiten 5 estudiantes");
return;

}

const numeroPagina =
estudiantes.length + 1;

const estudiante = {

nombre,
codigo,
pagina:`estudiante${numeroPagina}.html`

};

estudiantes.push(estudiante);

guardarEstudiantes(estudiantes);

nombreInput.value = "";
codigoInput.value = "";

mostrarEstudiantes();

}



// =====================================================
// MOSTRAR ESTUDIANTES
// =====================================================

function mostrarEstudiantes(){

const contenedor =
document.getElementById("listaEstudiantes");

if(!contenedor) return;

contenedor.innerHTML = "";

const estudiantes =
obtenerEstudiantes();

estudiantes.forEach((estudiante,index)=>{

contenedor.innerHTML += `

<div class="student-card">

<div>

<h3>${estudiante.nombre}</h3>

<p>
Código: ${estudiante.codigo}
</p>

</div>

<div class="student-buttons">

<button
class="primary-btn"
onclick="window.location.href='${estudiante.pagina}'">

Ingresar

</button>

<button
class="primary-btn"
onclick="editarEstudiante(${index})">

Editar

</button>

<button
class="primary-btn"
onclick="eliminarEstudiante(${index})">

Eliminar

</button>

</div>

</div>

`;

});

}



// =====================================================
// EDITAR ESTUDIANTE
// =====================================================

function editarEstudiante(index){

let estudiantes =
obtenerEstudiantes();

const nuevoNombre =
prompt(
"Nuevo nombre",
estudiantes[index].nombre
);

if(nuevoNombre === null) return;

const nuevoCodigo =
prompt(
"Nuevo código",
estudiantes[index].codigo
);

if(nuevoCodigo === null) return;

estudiantes[index].nombre =
nuevoNombre;

estudiantes[index].codigo =
nuevoCodigo;

guardarEstudiantes(estudiantes);

mostrarEstudiantes();

}



// =====================================================
// ELIMINAR ESTUDIANTE
// =====================================================

function eliminarEstudiante(index){

let estudiantes =
obtenerEstudiantes();

const confirmar =
confirm(
"¿Eliminar estudiante?"
);

if(!confirmar) return;

estudiantes.splice(index,1);

guardarEstudiantes(estudiantes);

mostrarEstudiantes();

}



// =====================================================
// CARGAR ENCABEZADO
// =====================================================

function cargarEncabezadoEstudiante(numero){

const titulo =
document.getElementById(
"tituloEstudiante"
);

const estudiantes =
obtenerEstudiantes();

const estudiante =
estudiantes[numero - 1];

if(titulo && estudiante){

titulo.innerHTML = `

${estudiante.nombre}

<br>

<span class="codigo-estudiante">

Código:
${estudiante.codigo}

</span>

`;

}

}



// =====================================================
// GUARDAR CONTENIDO
// =====================================================

function guardarContenido(numero){

const textarea =
document.getElementById("contenido");

const contenido =
document.getElementById(
"contenidoGuardado"
);

const imagenInput =
document.getElementById(
"imagenInput"
);

localStorage.setItem(
`contenidoEstudiante${numero}`,
textarea.value
);

contenido.innerHTML =
textarea.value;

if(imagenInput.files.length > 0){

Array.from(imagenInput.files).forEach((archivo)=>{

const lector =
new FileReader();

lector.onload = function(e){

let imagenes =
JSON.parse(
localStorage.getItem(
`imagenesEstudiante${numero}`
)
) || [];

imagenes.push(e.target.result);

localStorage.setItem(
`imagenesEstudiante${numero}`,
JSON.stringify(imagenes)
);

mostrarImagenes(numero);

};

lector.readAsDataURL(archivo);

});

}

alert("Información guardada");

}



// =====================================================
// CARGAR CONTENIDO
// =====================================================

function cargarContenido(numero){

const contenido =
localStorage.getItem(
`contenidoEstudiante${numero}`
);

const textarea =
document.getElementById("contenido");

const contenedor =
document.getElementById(
"contenidoGuardado"
);

if(textarea && contenido){

textarea.value = contenido;

}

if(contenedor && contenido){

contenedor.innerHTML =
contenido;

}

mostrarImagenes(numero);

}



// =====================================================
// MOSTRAR IMAGENES
// =====================================================

function mostrarImagenes(numero){

const imagenes =
JSON.parse(
localStorage.getItem(
`imagenesEstudiante${numero}`
)
) || [];

const contenedor =
document.getElementById(
"imagenesGuardadas"
);

if(!contenedor) return;

contenedor.innerHTML = "";

imagenes.forEach((imagen,index)=>{

contenedor.innerHTML += `

<div class="image-box">

<button
class="delete-image-btn"
onclick="eliminarImagen(${numero},${index})">

✖

</button>

<img
src="${imagen}"
class="student-image"
onclick="abrirImagen('${imagen}')">

</div>

`;

});

}



// =====================================================
// ELIMINAR IMAGEN
// =====================================================

function eliminarImagen(numero,index){

let imagenes =
JSON.parse(
localStorage.getItem(
`imagenesEstudiante${numero}`
)
) || [];

const confirmar =
confirm(
"¿Eliminar imagen?"
);

if(!confirmar) return;

imagenes.splice(index,1);

localStorage.setItem(
`imagenesEstudiante${numero}`,
JSON.stringify(imagenes)
);

mostrarImagenes(numero);

}



// =====================================================
// ABRIR IMAGEN
// =====================================================

function abrirImagen(imagen){

const modal =
document.createElement("div");

modal.classList.add("modal-imagen");

modal.innerHTML = `

<div class="modal-contenido">

<button
class="cerrar-modal"
onclick="cerrarModal()">

✖

</button>

<img
src="${imagen}"
class="imagen-expandida">

</div>

`;

document.body.appendChild(modal);

}



// =====================================================
// CERRAR MODAL
// =====================================================

function cerrarModal(){

const modal =
document.querySelector(".modal-imagen");

if(modal){

modal.remove();

}

}



// =====================================================
// ELIMINAR CONTENIDO
// =====================================================

function eliminarContenido(numero){

const confirmar =
confirm(
"¿Eliminar información?"
);

if(!confirmar) return;

localStorage.removeItem(
`contenidoEstudiante${numero}`
);

localStorage.removeItem(
`imagenesEstudiante${numero}`
);

document.getElementById(
"contenido"
).value = "";

document.getElementById(
"contenidoGuardado"
).innerHTML = "";

document.getElementById(
"imagenesGuardadas"
).innerHTML = "";

}



// =====================================================
// RESPONSABILIDAD ETICA
// =====================================================

function guardarResponsabilidad(){

const texto =
document.getElementById(
"contenidoResponsabilidad"
).value;

localStorage.setItem(
"responsabilidad",
texto
);

cargarResponsabilidad();

}



function cargarResponsabilidad(){

const texto =
localStorage.getItem(
"responsabilidad"
);

document.getElementById(
"contenidoResponsabilidadGuardado"
).innerHTML = texto || "";

}



function editarResponsabilidad(){

const actual =
localStorage.getItem(
"responsabilidad"
);

const nuevo =
prompt(
"Editar contenido",
actual
);

if(nuevo !== null){

localStorage.setItem(
"responsabilidad",
nuevo
);

cargarResponsabilidad();

}

}



function eliminarResponsabilidad(){

localStorage.removeItem(
"responsabilidad"
);

cargarResponsabilidad();

}



// =====================================================
// ESTUDIO DE CASO
// =====================================================

function guardarCaso(){

const texto =
document.getElementById(
"contenidoCaso"
).value;

localStorage.setItem(
"caso",
texto
);

cargarCaso();

}



function cargarCaso(){

const texto =
localStorage.getItem(
"caso"
);

document.getElementById(
"contenidoCasoGuardado"
).innerHTML = texto || "";

}



function editarCaso(){

const actual =
localStorage.getItem("caso");

const nuevo =
prompt(
"Editar caso",
actual
);

if(nuevo !== null){

localStorage.setItem(
"caso",
nuevo
);

cargarCaso();

}

}



function eliminarCaso(){

localStorage.removeItem("caso");

cargarCaso();

}