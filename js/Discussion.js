//Put comments from story comments array into list
function pullStoryComments(){
	$('#comments').empty();
	for(var i = 0; i < curStory.discussion.length; i++){
		appendComment( curStory.discussion[i] );
	}
}

function appendComment( comment ){
	$('#comments').append('<li>' + comment.text + '<p>From ' + comment.user.username + '</p></li>');
}
