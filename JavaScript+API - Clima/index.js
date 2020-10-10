



function Leer() {
    const ciudad = document.getElementById("input").value;
    const key='9ebc257ba76951cd62f1e472b24f15e5';
    buscar1(ciudad,key);
}

function buscar1(ciudad,key){
    const api_url=`http://api.openweathermap.org/data/2.5/forecast/?q=${ciudad}&cnt=7&units=metric&appid=${key}`

    
    fetch(api_url)
        .then(data => {return data.json()})
        .then(resultado=>{
            /*
            console.log(resultado);
            console.log(resultado.city.name);
            console.log(resultado.list[0].main.temp) 
            console.log(resultado.list[0].main.feels_like) 
            */

            try{
            var nombreCiudad = resultado.city.name;
            var tempActual = resultado.list[0].main.temp;
            var sensacionTer = resultado.list[0].main.feels_like;
            
            document.getElementById('ciudadNom').textContent = nombreCiudad;  //ciudad que se despliega
            document.getElementById('actualTemp').textContent = "Temperatura actual de " +tempActual + " °C"; //Temperatura actual centigrados
            document.getElementById('sensacionT').textContent = "Sensación termica de " + sensacionTer + " °C"; //sensacion terminca
            document.getElementById("input").value = "";
            } catch(error){
                alert("Intente otra ciudad");
                document.getElementById("input").value = ""; //borra lo escrito
            }
            
      });
    
}

