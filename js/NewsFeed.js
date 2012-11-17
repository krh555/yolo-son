var NewsFeed = new Array();

var pullStories = function() {
	$.ajax({
		  url: "php/stories.php",
		  type: "GET",
		  dataType: "json",
		  success: function(stories) {		  
		  	storyObjects = new Array();
		  	for(var i in stories){			
				storyObjects.push( new Story(stories[i], 0) );	
			}	
			pushToNewsFeed(storyObjects);			
		  	resetMarkers(storyObjects);
		  }
	});
}

function pushToNewsFeed( stories ){
	$('#stories').empty();
	for(var i in stories){
		story = stories[i];
		//Add a new story object to news feed array
		NewsFeed.push(story);
		
		//Create new list wrapper for story
		var $new_story = $('<ul id="story' + story.id + '" class="article"></ul>');
		
		//Add story properties to list
		$new_story.append( '<li class="title" ><a target="_blank" href="' + story.url + '">' + story.title + '</a></li>' );
		$new_story.append( '<li>' + story.username + '</li>' );
		$new_story.append( '<li>' + story.topics + '</li>' );
		$new_story.append( '<li>' + story.likes + ' likes</li>' );
		$new_story.append( '<li>' + story.num_comments + ' comments</li>' );
		$new_story.append( '<button class="editStory" value="' + story.id +'" > Edit</button>' );
		$new_story.append( '<button class="comment" value="' + story.id +'" > Comments </button>' );
		$new_story.append( '<button class="like" value="' + story.id +'" > Like </button>' );
		$new_story.append( '<button class="flag" value="' + story.id +'" > Mark as inappropriate </button>' );
		
		//Append new story to the feed
		$('#stories').append( $new_story );
	}
	reloadButtonHandlers();
}

function edit( storyid ){
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

function reloadButtonHandlers(){
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
	});
	$('.flag').off('click');
	$('.flag').click( function() {
		var id = $(this).val();
		$.post('php/stories.php', { action: 'flag', id: id });	
	});
}


