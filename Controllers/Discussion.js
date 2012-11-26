$(document).ready( function () {
	//Closes discussion div when exit button hit
	$('#closeDiscussion').click( function() {
		$('#map').css('width', '80%');
		$('#discussion').css('width','0%');
	} );
	
	$('#submitComment').click( function() {
		text = $('#commentText').val();
		story_id = $(this).val();
		$.post('php/comments.php', { story_id: story_id, content: text, action: "submit"} );		
		pullStoryComments(story_id);
		pullStories();
		$('#commentText').val('');
		$('#commentAuthor').val('');
		return false;
	} );
} );