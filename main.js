fetch("./alumnos.json")
.then(res => res.json())
.then(alumnos => {
    let ejemplo = document.getElementById("ejemplos")
    alumnos.forEach( function (alumno) {
        let li = document.createElement ("li")
            let promedio = calcularPromedio (alumno.nota1,alumno.nota2)
            console.log (promedio)
            if(promedio>=7){
                li.textContent = `${alumno.nombre} ${alumno.apellido} obtuvo en su primer parcial ${alumno.nota1}, y en su segundo parcial ${alumno.nota2}. Por lo tanto, tiene un promedio de ${alumno.promedio} , es decir, ha promocionado la asignatura y no debe rendir final.`
            }
            else if(promedio >=4 && promedio<7){
                li.textContent = `${alumno.nombre} ${alumno.apellido} obtuvo en su primer parcial ${alumno.nota1}, y en su segundo parcial ${alumno.nota2}. Por lo tanto, tiene un promedio de ${alumno.promedio} , es decir, ha aprobado la asignatura pero aún debe rendir final.`
            }
            else if(promedio<4){
                li.textContent = `${alumno.nombre} ${alumno.apellido} obtuvo en su primer parcial ${alumno.nota1}, y en su segundo parcial ${alumno.nota2}. Por lo tanto, tiene un promedio de ${alumno.promedio} , es decir, ha desaprobado la asignatura y debe recursar.`
            }
            ejemplo.appendChild(li)
    })
})


mostrarListado()
function agregarAlumno (){
    let nombre = document.getElementById("nombre").value
    let nota1 = document.getElementById("nota1").value
    let nota2 = document.getElementById("nota2").value
    if (!nombre || !nota1 || !nota2) {
        return 
    }
    let alumnos = JSON.parse(localStorage.getItem("alumnos"))
    if (!alumnos) {
        const alumno = {
            nombre,
            nota1,
            nota2,
        }
        localStorage.setItem("alumnos", JSON.stringify([alumno]))
    }
    else {
        const alumno = {
            nombre,
            nota1,
            nota2,
        }
        alumnos.push(alumno)
        localStorage.setItem("alumnos", JSON.stringify(alumnos))
    }
    document.getElementById("listado").innerHTML= ""
    mostrarListado()
    
}
function mostrarListado (){
    let lista = document.getElementById("listado")
    let alumnos = JSON.parse(localStorage.getItem("alumnos"))
    if (alumnos) {
        alumnos.forEach( function (alumno) {
            let li = document.createElement ("li")
            let promedio = calcularPromedio (alumno.nota1,alumno.nota2)
            console.log (promedio)
            if(promedio>=7){
                li.textContent = alumno.nombre + " ha promocionado la asignatura y por lo tanto no debe rendir final"
            }
            else if(promedio >=4 && promedio<7){
                li.textContent = alumno.nombre + " ha aprobado la asignatura pero aún debe rendir final"
            }
            else if(promedio<4){
                li.textContent = alumno.nombre + " ha desaprobado la asignatura y por lo tanto debe recursar"
            }
            lista.appendChild(li)
        })
    }
}

function calcularPromedio (nota1 , nota2){
    return (Number(nota1)+Number(nota2)) /2
}