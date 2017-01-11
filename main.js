var map;
var marker;


function displayMap(){

	var loc = {lat: 42.877742, lng: -97.380979};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: loc
	});
	
	map.addListener('click', function(event){
		removeMarker();
		marker = new google.maps.Marker({position: event.latLng, map: map});
		console.log('type of marker is '+typeof marker);
		var geocoder = new google.maps.Geocoder();
		var latAndLng = event.latLng.toString();
		latAndLng = latAndLng.replace(/[{()}]/g, '');
		var latlngStr = latAndLng.split(',', 2);
		console.log('latlngstr '+latlngStr);
        var latLng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
		

		

        geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === 'OK'){
					console.log(results[0].formatted_address);
					console.log(results[0].address_components);
					/////find the address components here
					var address = results[0].formatted_address;
					var message = address;
					UpdateWindowMessage(message);
					//var addressComponents = results[0].address_components
					//FindTheCountry(addressComponents);
				}else {
					message = ('Oops, please select another location.');
					UpdateWindowMessage(message);
				}


			function UpdateWindowMessage(message){

				var infoWindow = new google.maps.InfoWindow({
					content: message
				});
				infoWindow.open(map, marker);
			}

		});
		function removeMarker(){
			if(typeof marker === 'object' && marker !== null){
				if (map.getBounds().contains(marker.getPosition() ) ){
					marker.setMap(null);
				}
			}
		}
	});
}
/////event listener from previous branch

		
		
