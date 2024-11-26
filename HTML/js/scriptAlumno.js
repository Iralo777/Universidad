import { urlAlumno } from "./utiles.js";

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■busca los alumnos segun los datos aportados■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
window.buscarAlumnos=buscarAlumnos;
function buscarAlumnos() {
    console.log("dentro de buscarAlumnos")
    // Obtener los valores del formulario
    const idNifAlumno = document.getElementById("idNif").value;
    const nombreAlumno = document.getElementById("nombre").value;
    
   // Construir la URL para la solicitud
   let urlAlumnos = urlAlumno + "/buscar";

   if (idNifAlumno && !nombreAlumno) {
       urlAlumnos = urlAlumnos + "?idNif=" + idNifAlumno;
   } else if (nombreAlumno && !idNifAlumno) {
       urlAlumnos = urlAlumnos + "?nombre=" + nombreAlumno;
   } else {
       // Si no se proporcionan criterios, mostrar un mensaje y salir
       alert("Escoja ID-NIF o Nombre para buscar.");
       return;
   }
    // const urlAlumnos = urlAlumno+ "/buscar?idNif="+idNifAlumno+"&nombre="+nombreAlumno;
console.log("urlAlumnos que llega: "+urlAlumnos)
    // Referencia al cuerpo de la tabla
    const tablaResultados = document.getElementById("resultados");
    tablaResultados.innerHTML = ""; // Limpiar resultados anteriores

    // Realizar la solicitud
    fetch(urlAlumnos, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Verificar el contenido de data en la consola

            if (Array.isArray(data) && data.length > 0) {
                // Iterar sobre los profesores encontrados y añadir filas a la tabla
                data.forEach((alumno) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${alumno.id}</td>
                        <td>${alumno.nif}</td>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.apellido1}</td>
                        <td>${alumno.apellido2}</td>
                        <td>${alumno.ciudad}</td>
                        <td>${alumno.sexo}</td>
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