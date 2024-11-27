import { urlGestion } from "./utiles.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarGrados(),
    cargarCursos()
  });

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ cargo los grados en el select■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.cargarGrados = cargarGrados;
function cargarGrados() {
    const urlGrados = urlGestion+ "/grados"
    console.log(urlGrados);
  fetch(urlGrados, { method: "GET" }) 
    .then(response => response.json())
    .then(grados => {
      const selectGrado = document.getElementById('grado');

      selectGrado.innerHTML = "<option value=''>-- Selecciona un grado --</option>";
     
      console.log(grados.data)
      grados.data.forEach(grado => {
        const option = document.createElement('option');
        option.value = grado.id; 
        option.textContent = grado.nombre;
        selectGrado.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar los cursos script:', error);
    });
}


// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Funcion que carga los grados en el select■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.cargarCursos = cargarCursos;
function cargarCursos() {
    const urlCursos = urlGestion+ "/cursos"
    console.log(urlCursos);
  fetch(urlCursos, { method: "GET" }) 
    .then(response => response.json())
    .then(cursos => {
      const selectCurso = document.getElementById('curso-escolar');

      selectCurso.innerHTML = "<option value=''>-- Selecciona un curso --</option>";
     
      console.log(cursos.data)
      cursos.data.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id; 
        option.textContent = curso.curso;
        selectCurso.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar los cursos script:', error);
    });
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Función para mostrar asignaturas ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.cargarAsignaturas = cargarAsignaturas;

function cargarAsignaturas() {
  console.log("dentro de asignaturas");

  // Obtener el grado seleccionado
  const gradoSeleccionado = document.getElementById("grado").value;

  // Validar que se haya seleccionado un grado
  if (!gradoSeleccionado) {
      alert("Por favor, selecciona un grado.");
      return;
  }

  console.log("Grado seleccionado: ", gradoSeleccionado);

  // Referencia al contenedor donde se mostrarán las asignaturas
  const contenedorAsignaturas = document.getElementById("asignaturasLista");
  contenedorAsignaturas.innerHTML = "<p>Cargando asignaturas...</p>"; // Mensaje de carga

  // Construir la URL para la solicitud
  const urlAsignaturas = urlGestion + `/asignaturas/${gradoSeleccionado}`;
  console.log("URL para obtener asignaturas: ", urlAsignaturas);

  // Realizar la solicitud para obtener las asignaturas
  fetch(urlAsignaturas)
      .then((response) => response.json()) // Convertir la respuesta en formato JSON
      .then((data) => {
          console.log("Datos recibidos: ", data); // Debug: ver los datos recibidos

          // Verificar que la respuesta contenga las asignaturas
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
              // Limpiar el contenedor antes de agregar las nuevas asignaturas
              contenedorAsignaturas.innerHTML = "<label for='asignaturas'>Selecciona las asignaturas</label>";

              // Iterar sobre las asignaturas y mostrar un checkbox para cada una
              data.data.forEach((asignatura) => {
                  console.log("Asignatura encontrada: ", asignatura); // Debug: ver cada asignatura procesada

                  // Crear un contenedor para el checkbox
                  const contenedorCheckbox = document.createElement("div");
                  contenedorCheckbox.classList.add("checkbox-container");

                  // Crear el checkbox
                  const checkbox = document.createElement("input");
                  checkbox.type = "checkbox";
                  checkbox.id = asignatura.id; // ID de la asignatura
                  checkbox.name = "asignaturas"; // Nombre común para todos los checkboxes
                  checkbox.value = asignatura.id; // El valor puede ser el ID de la asignatura
                  checkbox.classList.add("checkbox");

                  // Crear la etiqueta del checkbox
                  const label = document.createElement("label");
                  label.setAttribute("for", checkbox.id);
                  label.textContent = asignatura.nombre; // Nombre de la asignatura

                  // Añadir el checkbox y la etiqueta al contenedor
                  contenedorCheckbox.appendChild(checkbox);
                  contenedorCheckbox.appendChild(label);

                  // Añadir el contenedor al contenedor principal
                  contenedorAsignaturas.appendChild(contenedorCheckbox);
              });
          } else {
              // Si no hay asignaturas
              contenedorAsignaturas.innerHTML = "<p>No se encontraron asignaturas para este grado.</p>";
          }
      })
      .catch((error) => {
          // Manejo de errores
          console.error("Error al obtener las asignaturas: ", error);
          contenedorAsignaturas.innerHTML = "<p>Error al obtener las asignaturas.</p>";
      });
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Función para matricular alumno ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.matricularAlumno = matricularAlumno;
function matricularAlumno(){
  console.log("dentro de matricula")

  const idAlumno = document.getElementById("id_alumno").value;
  const idCurso = document.getElementById("curso-escolar").value;

 // Validar que idAlumno y idCurso tengan un valor válido
 if (!idAlumno || !idCurso) {
  alert("Por favor, selecciona un alumno y un curso.");
  return;
}
//COMO SACO LAS ASIGNATURAS¿?¿?¿?¿?
  const checkboxes = document.querySelectorAll("#asignaturasLista .checkbox:checked");
  if (checkboxes.length === 0) {
    alert("Selecciona al menos una asignatura.");
    return;
  }

  const matriculas = [];//guardo todos los datos de la matricula

  checkboxes.forEach(checkbox => {//recorro como si fuera un for los checkbox guardados
    const idAsignatura = checkbox.value; //segun vaya encontrando uno, pilla el valor que encuentra
    matriculas.push({//empujo el array creado arriba 
        id_alumno: idAlumno,
        id_asignatura: idAsignatura,
        id_curso_escolar: idCurso
    });
  });
  
  //crear el url a subir
const urlMatricula= urlGestion+"/matricular"//❓❔❓❔❓❔❓❔❓ AYUDA ❔❓❔❓❔❓❔❓❔❓❔
// Crear el objeto que se enviará, incluyendo la clave "matriculas"
const bodyData = { matriculas: matriculas };
console.log("Datos de matrícula que se enviarán:", bodyData);
//el fetch
//crear body:json.stringify(matriculas) en el fetch algo content type para decirle que es un json en la cabecera en header:content-type
fetch(urlMatricula, {method: "POST",headers: {"Content-Type": "application/json"}, body: JSON.stringify(bodyData)})
  .then(response => {
      if (!response.ok) {
          console.error("Error en la respuesta del servidor");
          alert("No se pudo completar la matrícula. Verifica los datos e inténtalo nuevamente.");
          return; 
      }
      return response.json(); 
  })
  .then(resultado => {
      if (resultado) { 
          console.log("Matrícula exitosa:", resultado);
          alert(`Matrícula completada con éxito. Total asignaturas matriculadas: ${matriculas.length}`);
          document.getElementById("formMatricula").reset();
          document.getElementById("asignaturasLista").innerHTML = "";
      }
  })
  .catch(error => {
      console.error("Error inesperado:", error);
      alert("Ocurrió un error al realizar la matrícula. Intenta de nuevo.");
  });





}