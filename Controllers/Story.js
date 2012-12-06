$(document).ready( function () {
	$('#closeNewsFeed').click( function() {
		$('#map').css('width', '100%');
		$('#discussion').css('width', '0%');
		$('#newsFeed').css('width','0%');
		google.maps.event.trigger(map, 'resize') 
	} );
	
	//Handles submit story button and adds the story to the news feed
	$('#postStory').click( function() {
		if( current_user == 0){
			alert('Please login or create an account');
		}
		else {
			submitStory();
			return false;
		}
	} );
	
	$('#submitEdit').click( function() {
		if( current_user == 0){
			alert('Please login or create an account');
			return;
		}
		var id = $('#editStoryId').val();
		Story.edit( story_id );
		$('#editStoryDiv').slideUp('slow');
		getStories();
		return false;
	} );
	
	$('#cancelEdit').click( function() {
		$('#editStoryDiv').slideUp('slow');
		return false;
	} );
	
	$('#cancelPostStory').click( function() {
		$('#storyFormDiv').slideUp('slow');
		curMarker.setVisible(false);
	} );
} );

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
	var title = $.trim( $('#title').val() );
	var url = $.trim( $('#url').val() );
	var topic = $('#topic').val();
	var lat = $('#lat').val();
	var lng = $('#lng').val();
	var location = $.trim( $('#location').val() );
	//Check if any required fields are empty
	if ( title === "" || url === "" || location === "" ){
		alert("Make sure all form fields are filled out.");
		return;
	}
	//Put form data into an array and pass it to stories.php script
	//to create new database story record	
	$.post( "php/stories.php", $ ("#storyForm").serialize(), function(data) {
		//Create object and put at top of news feed
		//$('#stories').prepend( wrapStory( $.parseJSON( data ) ) );
		//pushStory( $.parseJSON(data), 0 );
		//reloadButtonHandlers();
	} );
	getStories();
	
	//Clear story form
	$('#title').val('');
	$('#url').val('');
	$('#topic').val('');
	$('#lat').val('');
	$('#lng').val('');
	$('#location').val('');
	//Hide form
	$('#storyFormDiv').hide();
};

Story.prototype.edit = function( storyid ){
	//Temporary variables for form input
	var title = $('#editTitle').val();
	var url = $('#editUrl').val();
	var topic = $('#editTopic').val();

	//Edit story in NewsFeed array of stories
	var story = NewsFeed[storyid];
	story.title = title;
	story.source = url;
	story.topic = topic;
	
	//Reload story info in news feed
	var listID = '#story' + storyid;
	$(listID).empty();
	$(listID).append('<li class="title" >' + story.title + '</li>' );
	$(listID).append('<li>' + story.username + '</li>' );
	$(listID).append('<li>' + story.url + '</li>' );
	$(listID).append('<li>' + story.topics + '</li>' );
	$(listID).append( '<button class="editStory" value="' + story.id +'" > Edit </button>' );
	$(listID).append( '<button class="comment" value="' + story.id +'" > Comments </button>' );
	$(listID).append( '<button class="like" value="' + story.id +'" > Like </button>' );
	$(listID).append( '<button class="flag" value="' + story.id +'" > Mark as inappropriate </button>' );
		
	reloadButtonHandlers();
		
	//Clear story form
	$('#editTitle').val('');
	$('#editUrl').val('');
	$('#editTopic').val('');
}

getStories = function() {
	$('#stories').empty();
	$.ajax({
		  url: "php/stories.php",
		  type: "GET",
		  dataType: "json",
		  success: function(stories) {		  
		  	storyObjects = new Array();
		  	for(var i = 0; i < stories.length; i++){			
				storyObjects.push( new Story(stories[i], 0) );	
			}	
			fillStories(storyObjects);			
		  	updateMap(storyObjects);
		  },
		  error: function(jqXHR, txt) {
		  	alert(txt);
		  }
	});
}

reloadButtonHandlers = function(){
	//Removes current click handlers and places new ones
	//Current handlers must be turned off or the click 
	//event will be called several times
	$('.editStory').off('click');
	$('.editStory').click( function() {
		var id = $(this).val();
		$('#editStoryId').val(id);
		$('#editStoryDiv').slideDown('slow');
		return false;
	} );
	$('.comment').off('click');
	$('.comment').click( function() {
		var story_id = $(this).val();
		$('#submitComment').val(story_id);
		//curStory = NewsFeed[story_id];
		$('#map').css('width', '60%');
		$('#discussion').css('width','20%');
		$('#addComment').slideDown('slow');
		pullStoryComments(story_id);
		return false;
	} );
	$('.like').off('click');
	$('.like').click( function() {
		var id = $(this).val();
		$.post('php/stories.php', { action: 'like', id: id });
		addLike(id);
		getStories();	
	});
	$('.flag').off('click');
	$('.flag').click( function() {
		var id = $(this).val();
		$.post('php/stories.php', { action: 'flag', id: id });	
		getStories();
	});
}