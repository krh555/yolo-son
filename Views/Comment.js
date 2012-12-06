var pullStoryComments = function(story_id){	
	var even = 1;
	$('#comments').empty();
	$.ajax({
	  url: "php/comments.php",
	  data: { story_id: story_id } ,
	  type: "GET",
	  dataType: "json",
	  success: function(comments) {  
	  	commentObjects = new Array();
	  	for(var i in comments){			
			commentObjects.push( new Comment(comments[i]) );
			c = commentObjects[i];
			if(even == 1){
				var $new_comment = $('<div class="commentEven"></div>');
				even = 0;
			}
			else{
				var $new_comment = $('<div class="commentOdd"></div>');
				even = 1;
			}			
			$new_comment.append('<p>' + c.username + ' said ...</p>');
			$new_comment.append('<p> ' + c.username + '</p>');
			$new_comment.append('<p>at ' + c.posted_on + '</p>');
			if( current_user.id != 0){
				if( current_user.id == c.user_id ){
					$new_comment.append( '<button class="editComment" value="' + c.id +'" > Edit</button>' );
					$new_comment.append( '<button class="deleteComment" value="' + c.id +'" > Delete</button>' );	
				}
			}
			$('#comments').append($new_comment);						
		}	
	  },
	  error: function(jqXHR, txt) {
	  }
	});	
}
