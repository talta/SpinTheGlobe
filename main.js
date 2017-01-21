var map;
var marker;
var message;
var icon;
var bodyType;



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
		removeMarker();
		getAddress(event);
		updateIconImage(bodyType);
		createMarker(event);
		UpdateWindowMessage(message);
	});
}
	

		
function getAddress(event){
	var geocoder = new google.maps.Geocoder();
	////parse GeoCoder into correct format:
	var latAndLng = event.latLng.toString();
	latAndLng = latAndLng.replace(/[{()}]/g, '');
	var latlngStr = latAndLng.split(',', 2);
    var latLng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
	findAddress();

	function findAddress(){
        geocoder.geocode({'location': latLng}, function(results, status) {
			if (status === 'OK'){
					var address = results[0].formatted_address;
					message = address;
					bodyType = 'land';
				}else {
					message = ('This body of water is unmarked, but it contains treasures.');
					bodyType = 'water';
				}
		});
	}
}


function createMarker(event){
	marker = new google.maps.Marker({
		position: event.latLng, 
		map: map,
		icon: icon
	});
}

function updateIconImage(bodyType){
	console.log('update icon image called');
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
	console.log(icon.url);
	console.log(bodyType);
}

function UpdateWindowMessage(message){
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});
	infoWindow.open(map, marker);
}

function removeMarker(){
	console.log('remove marker called');
	if(typeof marker === 'object' && marker !== null){
		if (map.getBounds().contains(marker.getPosition() ) ){
			marker.setMap(null);
		}
	}
}

function clearBodyType(){
	bodyType = '';
}


		
		
