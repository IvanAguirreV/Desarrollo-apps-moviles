var firebaseConfig = {
    apiKey: "AIzaSyBvl5YNKDgVS-PAJYqy8QE3XJD2g034uog",
    authDomain: "peliculas-98f7c.firebaseapp.com",
    databaseURL: "https://peliculas-98f7c.firebaseio.com",
    projectId: "peliculas-98f7c",
    storageBucket: "peliculas-98f7c.appspot.com",
    messagingSenderId: "657627297077",
    appId: "1:657627297077:web:1cc05ee226ebe74a36887c",
    measurementId: "G-S1CBEM85N0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='selecciona';
    document.getElementById("Input6").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var añoEstreno = document.getElementById("Input3").value;
    var director = document.getElementById("Input4").value;
    var genero = document.getElementById("Input5").value;
    var rating = document.getElementById("Input6").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var alumno = {
            id, //matricula:id
            nombre,
            añoEstreno,
            director,
            genero,
            rating
        }

        //console.log(alumno);

        firebase.database().ref('Peliculas/' + id).update(alumno).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Peliculas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(alumno){
    
    if(alumno!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = alumno.id;
        cell2.innerHTML = alumno.nombre; 
        cell3.innerHTML = alumno.añoEstreno; 
        cell4.innerHTML = alumno.director;
        cell5.innerHTML = alumno.genero; 
        cell6.innerHTML = alumno.rating; 
        cell7.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${alumno.id})">Eliminar</button>`;
        cell8.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+alumno.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Peliculas/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Peliculas/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(alumno){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=alumno.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=alumno.nombre;
        document.getElementById("Input3").value=alumno.añoEstreno;
        document.getElementById("Input4").value=alumno.director;
        document.getElementById("Input5").value=alumno.genero;
        document.getElementById("Input6").value=alumno.rating;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Peliculas");
    ref.orderByChild("genero").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(alumno){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.nombre; 
    cell3.innerHTML = alumno.añoEstreno; 
    cell4.innerHTML = alumno.director;
    cell5.innerHTML = alumno.genero; 
    cell6.innerHTML = alumno.rating; 

   
}