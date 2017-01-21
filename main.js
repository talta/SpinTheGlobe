var map;
var marker;
var message;
var icon;
var bodyType;
var latLng;
var geocoder;




function displayMap(){
	var loc = {lat: 0, lng: 0};

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: loc
	});
	locationListener();
}

function locationListener(){
	map.addListener('click', function(event){
		//1
		removeMarker();
		//2
		getAddress(event);
	});
}

function removeMarker(){
	if(typeof marker === 'object' && marker !== null){
		if (map.getBounds().contains(marker.getPosition() ) ){
			marker.setMap(null);
		}
	}
}	

function getAddress(event){
	parseAddress(event);
	geocodeAddress(latLng);

	function parseAddress(event){
		geocoder = new google.maps.Geocoder();
		////parse GeoCoder into correct format:
		var latAndLng = event.latLng.toString();
		latAndLng = latAndLng.replace(/[{()}]/g, '');
		var latlngStr = latAndLng.split(',', 2);
	    latLng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
	}

	function geocodeAddress(latLng){
	    geocoder.geocode({'location': latLng}, function handleAddress(results, status){
				if (status === 'OK'){
						var address = results[0].formatted_address;
						message = address;
						bodyType = 'land';
						console.log('2.b.i status is OK and: ' +message +bodyType);
					}else {
						message = ('This body of water is unmarked, but it contains treasures.');
						bodyType = 'water';
				}
				console.log('2.b message within findAddress function: '+message)
				updateIconImage(bodyType);
				createMarker(event);
				UpdateWindowMessage(message);
		});
	}

}



function updateIconImage(bodyType){
	console.log('3. update icon image called');
	if(bodyType === 'water'){
		console.log('update water image called');
		icon = {
			url: 'treasure.svg',
			size: new google.maps.Size (15,15)
		}
	}else{
		icon = {
			url: 'compass.svg',
			size: new google.maps.Size (15,15)
		}
	}
	console.log('icon image: '+icon.url);
	console.log('body type: '+bodyType);
}

function createMarker(event){
	console.log('4. create marker called');
	marker = new google.maps.Marker({
		position: event.latLng, 
		map: map,
		icon: icon
	});
}

function UpdateWindowMessage(message){
	console.log('5. update window message called');
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});
	infoWindow.open(map, marker);
}





		
		
