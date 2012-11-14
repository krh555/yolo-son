var NewsFeed = new Array();

function add( story ){
	//Add a new story object to news feed array
	NewsFeed.push(story);
	
	//Create new list wrapper for story
	var $new_story = $('<ul id="story' + story.id + '" class="article"></ul>');
	
	//Add story properties to list
	$new_story.append( '<li class="title" >' + story.title + '</li>' );
	$new_story.append( '<li>' + story.user.username + '</li>' );
	$new_story.append( '<li>' + story.source + '</li>' );
	$new_story.append( '<li>' + story.topic + '</li>' );
	$new_story.append( '<button class="editStory" value="' + story.id +'" > Edit</button>' );
	//$new_story.append( '<button class="comment" value="' + story.id +'" > Add comment </button>' );
	//$new_story.append( '<button value="' + story.id +'" > Like </button>' );
	
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
	$(listID).append('<li>' + story.user.username + '</li>' );
	$(listID).append('<li>' + story.source + '</li>' );
	$(listID).append('<li>' + story.topic + '</li>' );
	$(listID).append( '<button class="editStory" value="' + story.id +'" > Edit </button>' );
	//$(listID).append( '<button value="' + story.id +'" > Like</button>' );
		
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
	$('.article').click( function() {
		var id = jQuery(this).find('.editStory').val();
		curStory = NewsFeed[id];
		$('#map').css('width', '60%');
		$('#discussion').css('width','20%');
		$('#addComment').slideDown('slow');
		pullStoryComments(id);
		return false;
	} );
}


