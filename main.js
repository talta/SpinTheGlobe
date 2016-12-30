var map;
var APIKey = 'AIzaSyADZZ47Y-o54dJiJsxFJdeb2wnT5CSlkcQ';

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
		var contentString = '<div>' + event.latLng + '</div>';

		var infoWindow = new google.maps.InfoWindow({
			content: contentString
		});


		infoWindow.open(map, marker);

		console.log(latAndLng);


		getDataFromAPI(latAndLng, callbackFunction);
		///get info from API
		function getDataFromAPI(latAndLng, callbackFunction){
			console.log('get data called');
			var settings ={
				url:'https://maps.googleapis.com/maps/api/geocode/',
				data:{
					latlng:latAndLng,
					key: APIKey
				},
				dataType: 'jsonp',
				type:'GET',
				//result_type: country,
				success: callbackFunction
			};
			console.log(settings);
			$.ajax(settings);
			console.log('ajax settings called');
		}

		function callbackFunction(){
			console.log('callback called');
			console.log('here is the response '+ "results");
		}
		


		
		// function removeMarker(){
		// 	if (map.getBounds().contains(marker.getPosition())){
		// 		marker.setMap(null);
		// 	}
		// }
	});

}



$(document).ready(function(){
	console.log('document ready callled');
	displayMap();
	//markerListener();
});
