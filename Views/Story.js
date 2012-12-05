var NewsFeed = new Array();


fillStories = function( stories ){
	var even = 1;
	$('#stories').empty();
	NewsFeed = new Array();
	for(var i = 0; i < stories.length; i++){
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
		$new_story.append( '<button class="comment" value="' + story.id +'" > Comments </button>' );
		if( current_user != 0){
			if(story.user_id == current_user.id){
				$new_story.append( '<button class="editStory" value="' + story.id +'" > Edit</button>' );
				$new_story.append( '<button class="deleteStory" value="' + story.id +'" > Delete</button>' );				
			}
			if(story.user_id != current_user.id && current_user.likes.indexOf(story.id) == -1)
				$new_story.append( '<button class="like" value="' + story.id +'" > Like </button>' );
			//if(story.user_id != current_user.id && current_user.flags.indexOf(story.id) == -1)
				//$new_story.append( '<button class="flag" value="' + story.id +'" > Mark as inappropriate </button>' );
		}
		//Append new story to the feed
		$('#stories').append( $new_story );
	}
	reloadButtonHandlers();
}