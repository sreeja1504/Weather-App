
$( document ).ready(function() {
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position)
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d46ee0e6046ee3eecf92f50fde469b82`;
            // $.ajax({
            //     url : api ,
            //     method : 'GET' ,
            //     dataType : 'json' , 
            //     success : function(response) {
            //             console.log(response)
            //     },
            //     fail : function() {

            //     }
            // });
            fetch(api).then((response)=>{
                return response.json();
            })
            .then(data=>{
                $('#temp-value').html(Math.round(data.main.feels_like - 273));
                $('#location').html(data.name);
                $('#climate').html(data.weather[0].description);
                id=data.weather[0].id;
                let tempicon=document.getElementById("temp-icon");
                let searchInput=document.getElementById('search-input');
                if(id<300 && id>200){
                    $('#temp-icon').attr('src', './icons/storm.svg');
                }
                if(id<400 && id>300){
                    $('#temp-icon').attr('src', './icons/cloud-solid.svg');
                }
                if(id<500 && id>400){
                    $('#temp-icon').attr('src', './icons/rainy.svg');
                }
                if(id<600 && id>500){
                    $('#temp-icon').attr('src', './icons/snow-storm.svg');
                }
                if(id<700 && id>600){
                    $('#temp-icon').attr('src', './icons/snow-storm.svg');
                }
                if(id<800 && id>700){
                    $('#temp-icon').attr('src', './icons/clouds-and-sun.svg');
                }
                if(id==800){
                    $('#temp-icon').attr('src', './icons/atmosphere.svg');
                }
                $("#search-button").click(function(e){
                     e.preventDefault();
                    getWeather(searchInput.value);
                    searchInput.value='';
                  });
                  const getWeather= async(city)=>{
                      try{
                          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d46ee0e6046ee3eecf92f50fde469b82`);
                          const weatherData = await response.json();
                          $('#temp-value').html(Math.round(weatherData.main.feels_like - 273));
                          $('#location').html(weatherData.name);
                          $('#climate').html(weatherData.weather[0].description);
          
                      }catch(e){
                          alert("city not found");
                      }
                  };

            })

        })
    }
});