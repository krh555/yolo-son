//News Story

//Global variable that holds story object for current story being edited/commented/viewed
var curStory;

/* Initializes story object with fields corresponding to db table 'users'
 * params: new Story(integer, integer,string, string, string, array, float, float, string)
 */
var Story = function (id, user_id, username, title, url, topics, lat, lng, location) {
    this.id = id;
    this.user_id = user_id;
    this.username = username;
    this.title = title;
    this.url = url;    
    this.topics = topics;
    this.lat = lat;
    this.lng = lng;
    this.location = location;
    this.discussion = [];
    this.num_comments = 0;
    this.likes = 0; 
};
var Story = function(json, topics){
	json = $.parseJSON(json);
	for( var key in json){
		this[key] = json[key];
	}
	this.topics = "topic";
};

/* Called when storyForm is submitted, creates new story object,
 * inserts record for it in db and places marker on the map
 */ 
var submitStory = function(){	
	//Temporary variables for form input
	var title = $('#title').val();
	var url = $('#url').val();
	var topic = $('#topic').val();
	var lat = $('#lat').val();
	var lng = $('#lng').val();
	var location = $('#location').val();
	//Check if any required fields are empty
	if ( title === "" || url === "" || location === "" ){
		alert("Make sure all form fields are filled out.");
		return;
	}
	//Put form data into an array and pass it to stories.php script
	//to create new database story record
	//TODO return array containing inserted record values
	$.post( "php/stories.php", $("#storyForm").serialize() );
	
	//Add story properties to news feed
	//TODO init Story object with array returned from story creation
	//pushToNewsFeed( new Story(0, 0, "user", title, url, topic, lat, lng, location) );
	//Add marker to map at clicked coordinates
	var latlng = new google.maps.LatLng(lat, lng);
	var marker = new google.maps.Marker( {position: latlng, map: map} );
	//Creates an info window which pops up above the marker with information about it
	var infoWindowContent = title + '<br >' 
		+ 'user' + '<br >' 
		+ '<a href="url">' + url + '<a/>';
	var infoWindowOptions = {
    	content: infoWindowContent,
        position: latlng
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	//Opens info window at the location of the given marker (story just added)
	infoWindow.open(map, marker);

	//Clear story form
	$('#title').val('');
	$('#url').val('');
	$('#topic').val('');
	$('#lat').val('');
	$('#lng').val('');
	$('#location').val('');
	//Hide form
	$('#storyFormDiv').hide();
}

/* Edit attributes of story, title/source/user are immutable */
Story.prototype.editStory = function(topic, location) {
    this.topic = topic;
    this.location = location;
}
     

/*  add/decPopularity change popularity of story and user accordingly */
Story.prototype.addPopularity = function() {
    this.popularity = poularity++;
    this.user.addRating();
}

Story.prototype.decPopularity = function() {
    this.popularity = poularity--;
    this.user.decRating();
}

/* increment views of story for each click it has received */
Story.prototype.incViews = function() {
    this.views++;
}

/* Push a comment into the story's discussion array */
Story.prototype.addComment = function(text, user, timestamp) {
    var c = new Comment(text, user, timestamp, this);
    this.discussion.push(c);
    this.user.addComment(c);
}

/* Remove a comment from the discussion, only if the user has selected it */
Story.prototype.deleteComment = function(curUser, comment) {
    if(comment.user == curUser){
        this.discussion.splice(this.discussion.indexOf(comment), 1);
	curUser.deleteComment(comment);
	return true;
    }
    else return false; 
}

