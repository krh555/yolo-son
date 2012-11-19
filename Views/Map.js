//map holds the Google Map object
var map;
var geocoder;
var curMarker = new google.maps.Marker();
var markers = new Array();
var infoWindows = new Array();

var resetMarkers = function(stories) {
	markers.length = 0;
	infoWindows.length = 0;
	for(var i = 0; i < stories.length ; i += 1 ){
		story = stories[i];
		latlng = new google.maps.LatLng(story.lat, story.lng);
		marker = new google.maps.Marker( {position: latlng, map: map} );
		markers.push(marker);
		//Creates an info window which pops up above the marker with information about it
		infoWindowContent = story.title + '<br >' 
			+ story.username + '<br >' 
			+ '<a target="_blank" href="' + story.url +'">' + story.url + '<a/>';
		infoWindowOptions = {
	    	content: infoWindowContent,
	        position: latlng
	    };
	    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	    infoWindows.push(infoWindow);		
		addMarkerListener(markers[i], infoWindows[i]);
	}
}

var addMarkerListener = function(marker, infoWindow){
	//Opens info window at the location of the given marker (story just added)
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map, marker);
	});	
}

google.maps.Map.prototype.clearOverlays = function() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
}

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
	curMarker.setMap(map);
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
		$('#editLat').val( event.latLng.lat() );
		$('#editLng').val( event.latLng.lng() );
		curMarker.setVisible(true);
		curMarker.setPosition(event.latLng);
		//curMarker = new google.maps.Marker( {position: event.latLng, map: map} );
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
