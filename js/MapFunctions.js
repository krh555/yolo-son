/*Called when storyForm is submitted, creates new story object and places its contents in the news feed*/ 
var createStory = function(){	
	//Temporary variables for form input
	var title = $('#title').val();
	var url = $('#url').val();
	var user = $('#user').val();
	var topic = $('#topic').val();
	var lat = $('#lat').val();
	var lng = $('#lng').val();
	var location = $('#location').val();
	
	//Add story properties to news feed
	add( new Story( title, url, new User(user,'','',''), topic , lat, lng, location) );
	//Add marker to map at clicked coordinates
	var latlng = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker( {position: latlng, map: map} );
	//Creates an info window which pops up above the marker with information about it
	var infoWindowContent = title + '<br >' 
		+ user + '<br >' 
		+ '<a href="url">' + url + '<a/>';
	var infoWindowOptions = {
    	content: infoWindowContent,
        position: latlng
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	infoWindow.open(map, marker);
	
	//Clear story form
	$('#title').val('');
	$('#url').val('');
	$('#user').val('');
	$('#topic').val('');
	$('#location').val('');
	//Hide form
	$('#storyFormDiv').hide();
}

//map holds the Google Map object
var map;
var geocoder;
//Initializes Google Map options and places it in 'map' div container
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
	
	google.maps.event.addListener(map, 'click', function(event) {
		$('#map').css('width','80%');
		$('#newsFeed').css('width','20%');	
		$('#storyFormDiv').slideDown('slow');
		$('#lat').val( event.latLng.lat() );
		$('#lng').val( event.latLng.lng() );
		//Reverse geocode coordinates to find country of origin
		geocoder.geocode( {'latLng': event.latLng}, function(results, status) {
      		if (status == google.maps.GeocoderStatus.OK) {
        		var lastAddr = results.length-1;
        		if ( results[lastAddr] ) {
          			$('#location').val(results[lastAddr].formatted_address);
        		}
      		} else {
        		alert("Location not associated with a land mass");
      		}
   		});
	});
}
