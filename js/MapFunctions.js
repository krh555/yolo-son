//map holds the Google Map object
var map;
var geocoder;

//Initializes Google Map w/options and places it in 'map' div container
var gMapInit = function() {
	//   https://developers.google.com/maps/documentation/javascript/tutorial  - For GMap documentation
    var mapOptions = {
    	center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    //Initialize map with options and place in div container (#map)
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	//Initialize a geocoder object to lookup countries in coordinates
	geocoder = new google.maps.Geocoder();
	
	/* Event handler for clicks on the Google Map
	 * A click causes the News Feed to pop up with a create story form.
	 * The handler places the latitude,longitude for the story in hidden form
	 * fields. The coords are geocoded and the country of origin is placed in
	 * the form.
	 */
	google.maps.event.addListener(map, 'click', function(event) {
		//Slide map over and show news feed
		$('#map').css('width','80%');
		$('#discussion').css('width','0%');
		$('#newsFeed').css('width','20%');	
		//Show create story form
		$('#storyFormDiv').slideDown('slow');
		//Get lat,lng from event object (holds values related to click event)
		//Place lat, lng in appropriate story form fields
		$('#lat').val( event.latLng.lat() );
		$('#lng').val( event.latLng.lng() );
		//Reverse geocode coordinates to find country of origin
		geocoder.geocode( {'latLng': event.latLng}, function(results, status) {
      		if (status == google.maps.GeocoderStatus.OK) {
      			//Get least specific address relating to coords (country)
      			//TODO adjust address specificty according to zoom level on map
        		var lastAddr = results.length-1;
        		if ( results[lastAddr] ) {
          			$('#location').val(results[lastAddr].formatted_address);
        		}
        		$('#title').focus();        	
      		}
      		//Geocode failed, most likely b/c coords are in body of water 
      		else {
        		alert("Location not associated with a land mass");
        		$('#location').val("");
      		}
   		});
	});
}
