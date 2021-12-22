let tempT= document.querySelector(".temp_vista");
let desT= document.querySelector(".des_vista");
let diaT = document.querySelector(".dia_vista");
let lugT = document.querySelector(".lugar_vista");
let minT = document.querySelector(".min_vista");
let maxT = document.querySelector(".max_vista");
let visT = document.querySelector(".vis_vista");
let humT = document.querySelector(".hum_vista");
let VelT = document.querySelector(".vel_vista");
let icono = document.querySelector(".icono")



window.addEventListener("load",()=>{
    let longitud;
    let latitud;
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(posicion => {
       
         latitud = posicion.coords.latitude;
         longitud = posicion.coords.longitude;
         const apicode="4661e78b40870c0072fc2ce35e388479";
         const url= `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&cnt=3&appid=${apicode}&lang=es`;
         
         var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
         var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
         var f=new Date();

         let ObtenerDia = (diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

         diaT.textContent = ObtenerDia;
         

        let hora = new Date();

        horaya = hora.getHours()
        console.log(horaya)
       

        iconos_f=(dir,dir2)=>{
          if((horaya>=19 && horaya<24) || (horaya>0 && horaya<=6)){
            
            return icono.src= dir2 ;

          }else{ 
            return icono.src= dir;
            
            
          
          }
        }




       
         console.log(url);

         fetch(url)
            .then(response => response.json())
            .then(data =>{

              let descrip = data.weather[0].description;
              let temp = data.main.temp;
              let ubi  = data.name;
              let max = data.main.temp_max;
              let min = data.main.temp_min;
              let hum = data.main.humidity;
              let vel = data.wind.speed;
           
             let visi = data.visibility;

             tempT.textContent =`${Math.round(temp)}°c`;
             desT.textContent=descrip;
             lugT.textContent = ubi;
             minT.textContent = `${Math.round(min)}°c`;
             maxT.textContent =  `${Math.round(max)}°c`;
             VelT.textContent = `${vel} m/s`
             visT.textContent = `${visi} m`
             humT.textContent = `${hum} %`

             console.log(min)
              



           
             switch(data.weather[0].main){
               case "Clear": iconos_f("iconos/01d.svg","iconos/01n.svg");  break;
               case "Thunderstorm":iconos_f("iconos/11d.svg","iconos/11n.svg"); break;
               case "Drizzle":iconos_f("iconos/09d.svg","iconos/09n.svg"); break;
               case "Rain":iconos_f("iconos/10d.svg","iconos/10n.svg"); break;
               case "Snow":iconos_f("iconos/13d.svg","iconos/13n.svg"); break;
               case "Clouds":iconos_f("iconos/04d.svg","iconos/04n.svg"); break;
               
              


              
             }

             

            })
       
      })
      
  };
});