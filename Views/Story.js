var NewsFeed = new Array();

var even = 1;
fillStories = function( stories ){
	$('#stories').empty();
	for(var i in stories){
		story = stories[i];
		//Add a new story object to news feed array
		NewsFeed.push(story);
		//Create new list wrapper for story
		if(even == 1){
			var $new_story = $('<div class="articleEven"></div>');
			even = 0;
		}
		else{
			var $new_story = $('<div class="articleOdd"></div>');
			even = 1;
		}
		
		//Add story properties to list
		$new_story.append( '<h3><a target="_blank" href="' + story.url + '">' + story.title + '</a></h3>' );
		$new_story.append( '<p>Posted by ' + story.username + ' on ' + story.posted_on + '</p>' );
		$new_story.append( '<p>' + story.location + '</p>' );
		$new_story.append( '<p>' + story.likes + ' likes</p>' );
		$new_story.append( '<p>' + story.num_comments + ' comments</p>' );
		$new_story.append( '<button class="editStory" value="' + story.id +'" > Edit</button>' );
		$new_story.append( '<button class="comment" value="' + story.id +'" > Comments </button>' );
		$new_story.append( '<button class="like" value="' + story.id +'" > Like </button>' );
		$new_story.append( '<button class="flag" value="' + story.id +'" > Mark as inappropriate </button>' );
		
		//Append new story to the feed
		$('#stories').append( $new_story );
	}
	reloadButtonHandlers();
}