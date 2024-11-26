import { urlProfesor } from "./utiles.js";


// ⬇️⬇️ aqui le digo que me lo cargue en cuanto carga la pagina⬇️⬇️ sin esto no me funciona
document.addEventListener("DOMContentLoaded", () => {
  cargarDepartamentos();
  cargarProfesores();
});


window.cargarDepartamentos = cargarDepartamentos;
function cargarDepartamentos() {
    const urldepa = urlProfesor+ "/departamento"
    console.log(urldepa);
  // Realizamos una solicitud GET a la API para obtener los departamentos
  fetch(urldepa, { method: "GET" }) //fetch es como invocar
    .then(response => response.json())//then = y despues de invocar... y response es solo la manera de llamar a la "funcion" (le puedo poner el nombre que yo quiera) //y le digo que itere (recorra un bucle) sobre el json
    .then(departamentos => {
      // Obtenemos el <select> donde vamos a agregar los departamentos
      const selectDepartamento = document.getElementById('departamento');

      // Limpiamos las opciones actuales del select
      selectDepartamento.innerHTML = "<option value=''>Departamento</option>";
      //console.log("hola"+ JSON.stringify(departamentos));
      // Agregamos las opciones de los departamentos desde la respuesta de la API
      departamentos.data.forEach(departamento => {//bucle que itera sobre la estructura que tenga creada
        const option = document.createElement('option');
        option.value = departamento.nombre; // Usamos el nombre del departamento como valor
        option.textContent = departamento.nombre; // El texto que se mostrará en el select
        selectDepartamento.appendChild(option);
      });
    })
    .catch(error => {
      // En caso de error, mostramos un mensaje en la consola
      console.error('Error al cargar los departamentos script:', error);
    });
}


// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ estoy trabajando aqui ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■muestra todos los profesores al iniciar■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.cargarProfesores = cargarProfesores;

function cargarProfesores() {
    console.log("Estoy en cargando profesores");

    // Referencia al cuerpo de la tabla
    const tablaResultados = document.getElementById("resultados");
    if (!tablaResultados) {
        console.error("No se encontró el elemento con id 'resultados'.");
        return;
    }
    console.log("Elemento tablaResultados encontrado:", tablaResultados);

    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores
    console.log("Contenido de tablaResultados limpiado.");

    console.log("URL para la API:", urlProfesor);

    // Realizar la solicitud a la API
    fetch(urlProfesor, { method: "GET" })
        .then((response) => {
            console.log("Respuesta recibida del servidor:", response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Datos obtenidos de la API:", data);

            // Verificar si data es un array y tiene elementos
            if (Array.isArray(data.data) && data.data.length > 0) {
                console.log(`Se recibieron ${data.length} profesores.`);
                // Iterar sobre los profesores obtenidos y añadir filas a la tabla
                data.data.forEach((profesor, index) => {
                    console.log(`Agregando profesor en posición ${index}:`, profesor);

                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${profesor.nif}</td>
                        <td>${profesor.nombre}</td>
                        <td>${profesor.apellido1}</td>
                        <td>${profesor.apellido2}</td>
                        <td>${profesor.ciudad}</td>
                        <td>${profesor.sexo}</td>
                        <td>${profesor.departamento}</td>
                    `;
                    tablaResultados.appendChild(fila);
                });
            } else {
                console.warn("No se recibieron profesores o el array está vacío.");
                // Mostrar mensaje si no hay resultados
                const fila = document.createElement("tr");
                fila.innerHTML = `<td colspan="7">No hay profesores registrados.</td>`;
                tablaResultados.appendChild(fila);
            }
        })
        .catch((error) => {
            console.error("Error en catch:", error.message);
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="7">Error al cargar los datos de los profesores.</td>`;
            tablaResultados.appendChild(fila);
        });
}

// ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■busca los profesores segun los datos aportados■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.buscarProfesor=buscarProfesor;
function buscarProfesor() {
    console.log("dentro de buscarProfesor")
    // Obtener los valores del formulario
    const nombreProfesor = document.getElementById("nombre").value;
    const apellido1Profesor = document.getElementById("apellido1").value;
    const sexoProfesor = document.getElementById("sexo").value;
    const departamentoProfesor = document.getElementById("departamento").value;

    // Construir la URL para la solicitud
    const urlprofe = urlProfesor+ "/filtro?nombre="+nombreProfesor+"&apellido1="+apellido1Profesor+"&sexo="+sexoProfesor+"&departamento="+departamentoProfesor;

    // Referencia al cuerpo de la tabla
    const tablaResultados = document.getElementById("resultados");
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores

    // Realizar la solicitud
    fetch(urlprofe, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Verificar el contenido de data en la consola

            if (Array.isArray(data) && data.length > 0) {
                // Iterar sobre los profesores encontrados y añadir filas a la tabla
                data.forEach((profesor) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${profesor.nif}</td>
                        <td>${profesor.nombre}</td>
                        <td>${profesor.apellido1}</td>
                        <td>${profesor.apellido2}</td>
                        <td>${profesor.ciudad}</td>
                        <td>${profesor.sexo}</td>
                        <td>${profesor.departamento}</td>
                    `;
                    tablaResultados.appendChild(fila);
                });
            } else {
                // Mostrar mensaje si no hay resultados
                const fila = document.createElement("tr");
                // colspan lo que hace es una casilla de los espacios que tu le des, en este caso de 7 columnas
                fila.innerHTML = `<td colspan="7">No se encontraron profesores con los criterios especificados.</td>`;
                tablaResultados.appendChild(fila);
            }
        })
        .catch((error) => {
            console.error("Error en catch:", error.message);
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="7">Error al obtener los datos.</td>`;
            tablaResultados.appendChild(fila);
        });
}



