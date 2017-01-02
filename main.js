var map;
var APIKey = 'AIzaSyADZZ47Y-o54dJiJsxFJdeb2wnT5CSlkcQ';
var geocoder = new google.maps.Geocoder;

function displayMap(){

	var loc = {lat: 42.877742, lng: -97.380979};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: loc
		//center: 'United+States+of+America'
	});

	map.addListener('click', function(event){
		//removeMarker();
		var marker = new google.maps.Marker({position: event.latLng, map: map});
		
		var latAndLng = event.latLng.toString();
		latAndLng = latAndLng.replace(/[{()}]/g, '');
		latAndLng = latAndLng.replace(/\s/gi,'');
		var contentString = '<div>' + event.latLng + '</div>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentString
		});


		infoWindow.open(map, marker);

		console.log(latAndLng);


		// getDataFromAPI(latAndLng);
		// ///get info from API
		// function getDataFromAPI(latAndLng){
		// 	console.log('get data called');
		// 	var settings ={
		// 		//url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latAndLng+'&key='+APIKey,
		// 		url:'https://maps.googleapis.com/maps/api/geocode/json?latlng=42.877742,-97.380979&key=AIzaSyADZZ47Y-o54dJiJsxFJdeb2wnT5CSlkcQ',
		// 		//result_type: country,
		// 		success: function(data, status){
		// 			console.log('results '+ results[1].formatted_address);
		// 			console.log(typeof(results));
		// 			console.log('result log attempted');
		// 		}
		// 	};
		// 	console.log(settings);
		// 	$.ajax(settings);
		// 	console.log('ajax settings called');
		// }
		///alternative way to call the geocoder function
		geocodeLatLng(geocode, map, infoWindow);
		function geocodeLatLng(geocode, map, infoWindow){
			geocoder.Geocode({'location':latAndLng}, function(results, status){
				if (status === 'OK'){
					console.log(results);
				}else {
					window.alert('Geocoder failed due to '+status);
				}
			})
		}
	});

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
