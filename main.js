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
		var geocoder = new google.maps.Geocoder();
		var latAndLng = event.latLng.toString();
		latAndLng = latAndLng.replace(/[{()}]/g, '');
		// latAndLng = latAndLng.replace(/\s/gi,'');
		var latlngStr = latAndLng.split(',', 2);
		console.log('latlngstr '+latlngStr);
        var latLng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
		

		


		console.log(latLng)
        
        geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === 'OK'){
					console.log(results[0].formatted_address);
					var address = results[0].formatted_address;
					var message = address;
					UpdateWindowMessage(message);
				}else {
					message = ('Geocoder failed due to '+status);
					UpdateWindowMessage(message);
				}
		function UpdateWindowMessage(message){
			var infoWindow = new google.maps.InfoWindow({
				content: message
			});

		infoWindow.open(map, marker);

		}

		});

    });
}




		
		// function removeMarker(){
		// 	if (map.getBounds().contains(marker.getPosition())){
		// 		marker.setMap(null);
		// 	}
		// }
