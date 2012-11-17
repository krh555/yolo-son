$(document).ready( function () {
	$('#closeNewsFeed').click( function() {
		$('#map').css('width', '100%');
		$('#newsFeed').css('width','0%');
	} );
	
	//Handles submit story button and adds the story to the news feed
	$('#postStory').click( function() {
		submitStory();
		return false;
	} );
	
	$('#submitEdit').click( function() {
		var id = $('#editStoryId').val();
		edit( id );
		$('#editStoryDiv').slideUp('slow');
		return false;
	} );
	
	$('#cancelEdit').click( function() {
		$('#editStoryDiv').slideUp('slow');
		return false;
	} );
} );

var reloadButtonHandlers = function(){
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