var map;
var marker;
var MAPURL = "https://maps.googleapis.com/maps/api/js?key"+CLIENT_ID




function displayMap(){

	var loc = {lat: 0, lng: 0};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: loc
	});
	
	map.addListener('click', function(event){
		removeMarker();
		marker = new google.maps.Marker({position: event.latLng, map: map});
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
					message = ('This body of water is unmarked, but it contains treasures.');
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
$(document).ready(function(){
	displayMap();
})

		
		
