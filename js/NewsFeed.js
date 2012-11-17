var NewsFeed = new Array();

var retrieveStories = function() {
	$.ajax({
		  url: "php/stories.php",
		  type: "GET",
		  dataType: "json",
		  success: function(stories) {
		  	for(var i in stories){			
				pushToNewsFeed( new Story(stories[i], 0) );
			}	
		  }
	});
}

function pushToNewsFeed( story ){
	//Add a new story object to news feed array
	NewsFeed.push(story);
	
	//Create new list wrapper for story
	var $new_story = $('<ul id="story' + story.id + '" class="article"></ul>');
	
	//Add story properties to list
	$new_story.append( '<li class="title" ><a target="_blank" href="' + story.url + '">' + story.title + '</a></li>' );
	$new_story.append( '<li>' + story.username + '</li>' );
	$new_story.append( '<li>' + story.topics + '</li>' );
	$new_story.append( '<button class="editStory" value="' + story.id +'" > Edit</button>' );
	$new_story.append( '<button class="comment" value="' + story.id +'" > Comments </button>' );
	$new_story.append( '<button value="' + story.id +'" > Like </button>' );
	
	//Append new story to the feed
	$('#newsFeed').append( $new_story );
	
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
		
	reloadButtonHandlers();
		
	//Clear story form
	$('#editTitle').val('');
	$('#editUrl').val('');
	$('#editTopic').val('');
}

function reloadButtonHandlers(){
	$('.editStory').click( function() {
		var id = $(this).val();
		$('#editStoryId').val(id);
		$('#editStoryDiv').slideDown('slow');
		return false;
	} );
	$('.comment').click( function() {
		var id = jQuery(this).val();
		curStory = NewsFeed[id];
		$('#map').css('width', '60%');
		$('#discussion').css('width','20%');
		$('#addComment').slideDown('slow');
		pullStoryComments(id);
		return false;
	} );
}


