var map;
var APIKey = 'AIzaSyADZZ47Y-o54dJiJsxFJdeb2wnT5CSlkcQ';


function displayMap(){

	var loc = {lat: 42.877742, lng: -97.380979};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: loc
	});
	

	// document.getElementById('submit').addEventListener('click', function(){
	// 	geocodeLatLng(geocoder, infoWindow, map);
	// })
	map.addListener('click', function(){
		var marker = new google.maps.Marker({position: event.latLng, map: map});
		console.log(event.latLng); 
		console.log(typeof(event.latLng));
		geocodeLatLng(event);

	})
}

function geocodeLatLng(event){

		//removeMarker();
		console.log(event.latLng); 
		console.log(typeof(event.latLng));
		var latAndLng = event.latLng.toString();
		latAndLng = latAndLng.replace(/[{()}]/g, '');
		latAndLng = latAndLng.replace(/\s/gi,'');
		var geocoder = new google.maps.Geocoder;
		var contentString = ''
		var infoWindow = new google.maps.InfoWindow;
		// var latlngStr = input.split(',', 2);
  //       var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        
        geocoder.geocode({'location': latAndLng}, function(results, status) {
			if (status === 'OK'){
					console.log(results);
				}else {
					window.alert('Geocoder failed due to '+status);
				}

			// contentString = '<div>' + event.latLng + '</div>';

			infoWindow = new google.maps.InfoWindow({
				content: contentString
			});

		infoWindow.open(map, marker);
		});

		// console.log(latAndLng);
		// console.log('type of latlng '+typeof(latAndLng));
		// getDataFromAPI(latAndLng);
		// ///get info from API
		// function getDataFromAPI(latAndLng){
		// 	console.log('get data called');
		// 	var settings ={
		// 		//url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latAndLng+'&key='+APIKey,
		// 		url:'https://maps.googleapis.com/maps/api/geocode/json?latlng=42.877742,-97.380979&key=AIzaSyADZZ47Y-o54dJiJsxFJdeb2wnT5CSlkcQ',
		// 		//result_type: country,
		// 		success: function(results, status){
		// 			console.log('results '+ results);
		// 			console.log(typeof(results));
		// 			console.log('result log attempted');
		// 			console.log(status+' for the status');
		// 		}
		// 	};
		// 	console.log(settings);
		// 	$.ajax(settings);
		// 	console.log('ajax settings called');
		// }
		// //alternative way to call the geocoder function
		// geocodeLatLng(geocoder, latAndLng, map, infoWindow);
		
		// 	console.log(geocoder);
		// 	geocoder.geocode({'location':latAndLng}, function(results, status){
		// 		if (status === 'OK'){
		// 			console.log(results);
		// 		}else {
		// 			window.alert('Geocoder failed due to '+status);
		// 		}
		// 	})
		// }

}




$(document).ready(function(){
	console.log('document ready callled');
	displayMap();
	//markerListener();
});



		


		
		// function removeMarker(){
		// 	if (map.getBounds().contains(marker.getPosition())){
		// 		marker.setMap(null);
		// 	}
		// }
