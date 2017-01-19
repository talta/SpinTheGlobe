var map;
var marker;




function displayMap(){
	var loc = {lat: 0, lng: 0};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: loc
	});
	
	map.addListener('click', function(event){
		removeMarker();
		var icon = {
			url: 'treasure.svg',
			size: new google.maps.Size(15, 15),
		}
		marker = new google.maps.Marker({
			position: event.latLng, 
			map: map,
			icon: icon
		});
		var geocoder = new google.maps.Geocoder();
		////parse GeoCoder into correct format:
		var latAndLng = event.latLng.toString();
		latAndLng = latAndLng.replace(/[{()}]/g, '');
		var latlngStr = latAndLng.split(',', 2);
        var latLng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
		

		

        geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === 'OK'){
					var address = results[0].formatted_address;
					var message = address;
					UpdateWindowMessage(message);
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


		
		
