import { urlCurso } from "./utiles.js";

document.addEventListener("DOMContentLoaded", () => {
    cargarGrados()
  });

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■cargo los datos en el select■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.cargarGrados = cargarGrados;
function cargarGrados() {
    const urlGrados = urlCurso+ "/grados"
    console.log(urlGrados);
  fetch(urlGrados, { method: "GET" }) 
    .then(response => response.json())
    .then(grados => {
      const selectGrado = document.getElementById('grado');

      selectGrado.innerHTML = "<option value=''>-- Selecciona un grado --</option>";
     
      console.log(grados.data)
      grados.data.forEach(grado => {
        const option = document.createElement('option');
        option.value = grado.nombre; 
        option.textContent = grado.nombre;
        selectGrado.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar los cursos script:', error);
    });
}

//■■■■■■■■■■■■■■■■■■■■■■■■cargar las asignaturas y profes segun grado■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.cargarAsignaturas = cargarAsignaturas;
function cargarAsignaturas() {
    console.log("dentro de cargarAsignaturas")
    // Obtener los valores del formulario
    const asignaturaGrado = document.getElementById("grado").value;
    console.log(asignaturaGrado);
    // Construir la URL para la solicitud
    const urlasignaturasCurso = urlCurso + "/asignaturas?idGrado=" + asignaturaGrado;

    // Referencia al cuerpo de la tabla (modificado para usar el ID correcto)
    const tablaResultados = document.getElementById("contenidoTabla"); // Cambié "resultados" por "contenidoTabla"
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores

    // Realizar la solicitud
    fetch(urlasignaturasCurso, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log("data.data",data.data); // Verificar el contenido de data en la consola

            if (Array.isArray(data.data) && data.data.length > 0) {
                // Iterar sobre los profesores encontrados y añadir filas a la tabla
                data.data.forEach((asignatura) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${asignatura.nombre}</td>
                        <td>${asignatura.creditos}</td>
                        <td>${asignatura.curso}</td>
                        <td>${asignatura.cuatrimestre}</td>
                        <td>${asignatura.profesor}</td>
                    `;
                    tablaResultados.appendChild(fila);
                });
            } else {
                // Mostrar mensaje si no hay resultados
                const fila = document.createElement("tr");
                // colspan lo que hace es una casilla de los espacios que tu le das, en este caso de 7 columnas
                fila.innerHTML = `<td colspan="5">No se encontraron asignaturas con los criterios especificados.</td>`; // Cambié 7 por 5
                tablaResultados.appendChild(fila);
            }
        })
        .catch((error) => {
            console.error("Error en catch:", error.message);
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="5">Error al obtener los datos.</td>`; // Cambié 7 por 5
            tablaResultados.appendChild(fila);
        });
}
