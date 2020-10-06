function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='selecciona';
    document.getElementById("Input8").value='selecciona';
}

function createR() {
    
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
        var peli = {
            id,
            nombre,
            añoEstreno,
            director,
            genero,
            rating
        }

        var lista_peliculas=JSON.parse(localStorage.getItem("peli"));

        if(lista_peliculas==null)
        { 
            var lista_peliculas = [];
        }
        
        const existe =lista_peliculas.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_peliculas=lista_peliculas.filter(peli=>peli.id!=id);

            }
                
            lista_peliculas.push(peli);
            var temporal = lista_peliculas.sort((a,b) => a.id-b.id);
            localStorage.setItem("peli", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de pelicula","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_alumnos = JSON.parse(localStorage.getItem("peli"));
    
     
    if(lista_alumnos)
    {
        lista_alumnos.forEach((peli)=>printRow(peli));
    }
}


function printRow(peli){
    
    if(peli!=null){
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
        cell1.innerHTML = peli.id;
        cell2.innerHTML = peli.nombre; 
        cell3.innerHTML = peli.añoEstreno;
        cell4.innerHTML = peli.director; 
        cell5.innerHTML = peli.genero; 
        cell6.innerHTML = peli.rating; 
        cell7.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${peli.id})">Eliminar</button>`;
        cell8.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+peli.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_peliculas = JSON.parse(localStorage.getItem("peli"));
    var temporal=lista_peliculas.filter(peli=>peli.id!=id);
    localStorage.setItem("peli", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("peli");
    }
 
    read();
    
}

function seekR(id){

    const lista_peliculas = JSON.parse(localStorage.getItem("peli"));
    var peli=lista_peliculas.filter(peli=>peli.id==id);
    //console.log(alumno[0]);
    updateR(peli[0]);
}

function updateR(peli){
    if(peli!=null)
    {
        document.getElementById("Input1").value=peli.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=peli.nombre;
        document.getElementById("Input3").value=peli.añoEstreno;
        document.getElementById("Input4").value=peli.director;
        document.getElementById("Input5").value=peli.genero;
        document.getElementById("Input6").value=peli.rating;
    }
}


//Para consulta de genero
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input1").value;
  
    const lista_peliculas = JSON.parse(localStorage.getItem("peli"));
    var pelisc=lista_peliculas.filter(peli=>peli.genero==c);
    if(pelisc)
    {
        pelisc.forEach((peli)=>printRowQ(peli));
    }
    

}


function printRowQ(peli){

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
    cell1.innerHTML = peli.id;
    cell2.innerHTML = peli.nombre; 
    cell3.innerHTML = peli.añoEstreno; 
    cell4.innerHTML = peli.director;
    cell5.innerHTML = peli.genero; 
    cell6.innerHTML = peli.rating;  
   
}