var map;
var latitude;
var longitude;

 function addMarker( latitude, longitude, label ){
    // Create the marker - this will automatically place it
    // on the existing Google map (that we pass-in).
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
            latitude,
            longitude
        ),
        title: (label || "")
    });
    // Return the new marker reference.
    return( marker );
}

function updateMarker( marker, latitude, longitude, label ){
    // Update the position.
    marker.setPosition(
        new google.maps.LatLng(
            latitude,
            longitude
        )
    );
    // Update the title if it was provided.
    if (label){
        marker.setTitle( label );
    }
}

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

if ("geolocation" in navigator) {
	var locationMarker = null;
    navigator.geolocation.getCurrentPosition(function(position) {    
    	alert(position.coords.latitude + " " + position.coords.longitude); 
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: position.coords.latitude, lng: position.coords.longitude},
				//center: {lat: -16.398822, lng: -71.536886},
				zoom: 20
			});

			locationMarker = addMarker(
                position.coords.latitude,
                position.coords.longitude,
                "Initial Position"
            );
		};
		initMap();    
    }, function(error){
    	alert("Error ocurred. Error code: " + error.code);
    }, geo_options);

    var positionTimer = navigator.geolocation.watchPosition(
        function( position ){
            // Log that a newer, perhaps more accurate
            // position has been found.
            console.log( "Newer Position Found" );
            // Set the new position of the existing marker.
            updateMarker(
                locationMarker,
                position.coords.latitude,
                position.coords.longitude,
                "Updated / Accurate Position"
            );
        }
    );

    setTimeout(
        function(){
            // Clear the position watcher.
            navigator.geolocation.clearWatch( positionTimer );
        },
        (1000 * 60 * 5)
    );

	/*navigator.geolocation.watchPosition(function(position) { 
		console.log(position.coords.latitude, position.coords.longitude);  
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: position.coords.latitude, lng: position.coords.longitude},
				//center: {lat: -16.398822, lng: -71.536886},
				zoom: 20
			});
		};
		initMap();    
    }, function(error){
    	alert('Error occurred. Error code: ' + error.code);
    });*/
} else {
  alert("No se tiene acceso a la geolocalización!");
}