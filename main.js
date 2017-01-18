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
		marker = new google.maps.Marker({
			position: event.latLng, 
			map: map
			// animation: google.maps.Animation.DROP,
		});
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
					findCountryValue(results);
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
		function findCountryValue(results){
			console.log('find country nme called');
			var address = results[0].address_components;
			console.log(address.length-1);
			for(var i = 0; i<=address.length-1; i++){
				console.log(address[i].types[0]);
				if (address[i].types[0] ==='country'){
					console.log('this is the country '+address[i].types[0]);
					var country = address[i].long_name;
					console.log('this is the parent of the country '+ country)
				}else{
					console.log('this is not the country');
				}

			};
		}
		function UNAPIConnection(){

		}
	});
}


		
		
