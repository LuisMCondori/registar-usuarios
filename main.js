//Campos de formulario
const nombreInput = document.querySelector('#nombre');

//UI    
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

const contenido = document.querySelector('#contenido');


class Citas {
    constructor() {
        //Cada vez que se inicie el programa va crear un arreglo de citas
        this.citas = [];
    }

    agregarCita(cita) {
        //Tomamos una copia de this.citas y le pasamos la cita actual.
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        //Vamos a traer todas las citas diferentes a la q nos estamos pasando
        this.citas = this.citas.filter( cita => cita.id !== id )
    }
}

class UI {
    imprimirAlerta(mensaje, tipo){
        //Crear el Div
        const divMensaje = document.createElement('div');
        //Mnesaje de Error
        divMensaje.textContent = mensaje;
        //Agregamos el dom
        contenido.insertBefore(divMensaje, document.querySelector('#agregar-cita'));
        //Quitar la alerta despuesde 3 segundo
        setTimeout(()=>{
            divMensaje.remove();
        }, 3000)
    }

    imprimirCitas({citas}){

        this.limpiarHTML();

        citas.forEach(cita => {
            const {nombre,id} = cita;

            const divCita = document.createElement('div');
            divCita.dataset.id = id;

            const nombreParrafo = document.createElement('p')
            nombreParrafo.textContent = nombre;

            //Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = 'Eliminar';

            btnEliminar.onclick = () => eliminarCita(id);

            //Añade un boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = 'Editar';

            //Agregar los parrafos al divcita
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

//INSTANCIAMOS LAS CLASES
const ui = new UI();
const administrarCitas = new Citas();

/* *************************************************************************** */
/* *************************************************************************** */
/* *************************************************************************** */


//REGISTRAR EVENTOS
eventListeners();

function eventListeners() {
    nombreInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

/*
Creamos un objeto, con datos vacios, mientras yo voy escribiendo en los input 
se va ir llenando la propiedad del objeto, para que funcione en el html debe
estar el NAME definido, para leer ese NAME se pone "e.target.name"
 */
/*=== OBJETO ====*/
const citaObj = {
    nombre : ''
}


/* ====== FUNCIONES ======*/

//AGREGA DATOS AL OBJETO DE CITAS
    /*
        Accedemos a la propiedad de objeto
        Nosotros nos situamos en el input nombre entonces sabemos que
        e.target.name = nombre -> citaObj[nombre] y esto va ser igual 
        al valor que nosotros escribamos en el input.
        citaObj[nombre] = luis, esto quiere decir que dentro del objeto
        
        const citaObj = {
            nombre : 'luis'
        }

        Con esto ya estamos llenando el objeto
    */

function datosCita(e) {    
    citaObj[e.target.name] = e.target.value;
}

//VALIDA Y AGREGA UNA NUEVA CITA A LA CLASE DE CITAS
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de cita
    /*
        Hacemos destructuring de objeto
        Que pasa si no hacemos destructuring de objetos
        Bueno podemos utlizar la siguiente forma para 
        acceder a los objetos "citaObj.nombre"

        if( citaObj.nombre === ''){
            console.log('Todos los campos son obligatorios');
        }
    
    */
    const {nombre} = citaObj;

    //Validamos
    if( nombre === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;//Para que no se ejecute la siguiente linea
    }

    //GENERAR UN ID UNICO
    citaObj.id = Date.now();

    //Creando una nueva cita
    administrarCitas.agregarCita({...citaObj});

    //Reiniciar el objeto
    reiniciarObjeto();

    //Reiniciar el formlario
    formulario.reset();

    //Mostrar el HTML de las Citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    citaObj.nombre = '';
}

function eliminarCita(id) {
    //Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente')

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);

}