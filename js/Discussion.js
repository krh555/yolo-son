var pullStoryComments = function(story_id){	
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
			$('#comments').append('<li>' + commentObjects[i].content + '<p>From ' + commentObjects[i].username + '</p></li>');
		}	
	  },
	  error: function(jqXHR, txt) {
	  }
	});	
}
