var map;
var latitude;
var longitude;
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {    
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				//center: {lat: position.coords.latitude, lng: position.coords.longitude},
				center: {lat: -16.398822, lng: -71.536886},
				zoom: 20
			});
		};
		initMap();    
    });
} else {
  alert("No se tiene acceso a la geolocalización!");
}