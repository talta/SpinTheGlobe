///var map;
var marker;


function displayMap(event){
	var loc = {lat: 42.877742, lng: -97.380979};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: loc
	});

	var marker = new google.maps.Marker({
		position: event.latLng, 
		map: map, 
		title:'this is a marker'
	})


	google.map.event.addListener(map, 'click', function(){
		console.log('display marker called');


	});
}



function removeMarker(){

}



$(document).ready(function(){
	console.log('document ready called');
	displayMap(event);
});




/*resources:
https://www.data.gov/
https://developers.google.com/maps/documentation/javascript/markers
https://www.google.com/webhp?sourceid=chrome-instant&rlz=1C5CHFA_enUS721&ion=1&espv=2&ie=UTF-8#q=set%20marker%20on%20google%20map
http://stackoverflow.com/questions/19087352/capture-coordinates-in-google-map-on-user-click
https://www.data.gov/developers/apis
https://developers.google.com/maps/documentation/android-api/map
*/