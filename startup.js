$(document).ready( function () {
	$('#storyFormDiv').hide();
	$('#editStoryDiv').hide();
	$('#addComment').hide();
	
	//Hide all sub-menus
	$('ul.topic_menu').hide();
	$('ul.location_menu').hide();
	$('ul.newspaper_menu').hide();
	$('ul.viewed_menu').hide();
	$('ul.recent_menu').hide();
	$('ul.favorite_menu').hide();
	$('ul.login_menu').hide();
	
	gMapInit();
	pullStories();
	/* TODO
	* -Fix error handling for login/register ajax requests 
	* -Hide form after authenticating
	* -Add logout button to account bar and make handler
	* -Fix greeting after logging in 
	* -LONG TERM: Build account bar for authenticatd users i.e. list of liked stories, users, etc.
	* 
	*/
} );


