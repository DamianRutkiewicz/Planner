$(document).ready(function(){
	var lat="52.23";
	var lon = "21.01";
	var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=06a64d8a64a5d7158cca6215772051d0";
	var temp;
	$.getJSON(api,function(data){
		// alert(data.coord.lon);
		temp=data.main.temp-273.15;
		
	})

	// var weather = new XMLHttpRequest(); 
	// weather.open("GET","http://api.wunderground.com/api/fa5715ba5adff2ac/conditions/q/CA/San_Francisco.json",false);

	// weather.send(null);

	// var r = JSON.parse(weather.response);

	// var dis = "Current location: "+r.current_observation.display_location.full+"<br/>";

	// var temp = r.display_location
})