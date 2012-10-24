/*Called when storyForm is submitted, creates new story object and places its contents in the news feed*/ 
var createStory = function(){	
	//Temporary variables for form input
	var title = $('#title').val();
	var url = $('#url').val();
	var user = $('#user').val();
	var topic = $('#topic').val();
	
	//Add story properties to news feed
	add( new Story( title, url, new User(user,'','',''), topic , 0, 0, '', '' ) );
	
	//Clear story form
	$('#title').val('');
	$('#url').val('');
	$('#user').val('');
	$('#topic').val('');
}
