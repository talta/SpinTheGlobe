var map;
var APIKey = 'AIzaSyADZZ47Y-o54dJiJsxFJdeb2wnT5CSlkcQ';


function displayMap(){

	var loc = {lat: 42.877742, lng: -97.380979};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: loc
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
