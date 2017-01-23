
//variables to be used throughout multiple functions
var map;
var marker;
var message;
var icon;
var bodyType;
var latLng;
var geocoder;




function displayMap(){
	///called by the google maps instantiation in the index.html file
	var loc = {lat: 0, lng: 0};

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 2,
		center: loc
	});
	locationListener();
}

function locationListener(){
	/// event listener to allow the map to listen to potential clicks
	map.addListener('click', function(event){
		removeMarker();
		getAddress(event);
	});
}

function removeMarker(){
	///removes any previously placed markers which may exist on the map
	if(typeof marker === 'object' && marker !== null){
		if (map.getBounds().contains(marker.getPosition() ) ){
			marker.setMap(null);
		}
	}
}	

function getAddress(event){
	///finds the address of the click event
	parseAddress(event);
	geocodeAddress(latLng);

	function parseAddress(event){
		///parses the click event results in order to be read by the reverse geocoder
		geocoder = new google.maps.Geocoder();
		latLng = event.latLng.toString();
		latLng = latLng.replace(/[{()}]/g, '');
		latLng = latLng.split(',', 2);
	    latLng = {lat: parseFloat(latLng[0]), lng: parseFloat(latLng[1]) };
	}

	function geocodeAddress(latLng){
		///reverse geocode the address in order to find the address from the latitute and longitude
	    geocoder.geocode({'location': latLng}, function handleAddress(results, status){
			if (status === 'OK'){
					var address = results[0].formatted_address;
					message = address;
					bodyType = 'land';
				}else {
					bodyType = 'water';
					message = 'This body of water is unmarked, and may contain treasures.';
			}
			/////functions added here in order to act synchronicously
			updateIconImage(bodyType);
			createMarker(event);
			UpdateWindowMessage(message);
		});
	}

}



function updateIconImage(bodyType){
	///place the marker as an image based on the body type which is clicked: land or water
	if(bodyType === 'water'){
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
}

function createMarker(event){
	///adds a marker onto the map where the click event occurred
	marker = new google.maps.Marker({
		position: event.latLng, 
		map: map,
		icon: icon
	});
}

function UpdateWindowMessage(message){
	///updates the marker's window with pertintent message
	var infoWindow = new google.maps.InfoWindow({
		content: message
	});
	infoWindow.open(map, marker);
}





		
		
