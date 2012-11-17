$(document).ready( function () {
	$('#storyFormDiv').hide();
	$('#editStoryDiv').hide();
	$('#addComment').hide();
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
	
	
	//Register button event handler sends registration request to users.php
	$('#register').click( function() {
		//Get form input from #loginForm in #account div
		var name = $('#userName').val();
		var pw = $('#password').val();
		//MD5 encrypt password before sending it to the server
		pw = CryptoJS.MD5(pw).toString();
		//Called users.php script with register action to create a new account
		// !!! FIX ERROR HANDLING HERE AND IN users.php !!!
		$.post("php/users.php", { userName: name, password: pw, action: "register" }, function(data) {
			$('#account').append(data);
		}).error(function(data) {
			$('#account').append(data);	
		});
	});
	
	//Submit login form button event handler sends login request to users.php
	$('#submitLogin').click( function() {
		//Get form input from #loginForm in #account div
		var name = $('#userName').val();
		var pw = $('#password').val();
		//MD5 encrypt password before sending it to the server
		pw = CryptoJS.MD5(pw).toString();
		//Call users.php with login action set to authenticate existing user account
		// !!! FIX ERROR HANDLING HERE AND IN users.php !!!
		$.post("php/users.php", { userName: name, password: pw, action: "login" }, function(data) {
			$('#account').append(data);
		} );
	});
	
	//Closes discussion div when exit button hit
	$('#closeDiscussion').click( function() {
		$('#map').css('width', '80%');
		$('#discussion').css('width','0%');
	} );
	
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
	
	$('#submitComment').click( function() {
		text = $('#commentText').val();
		story_id = $(this).val();
		$.post('php/comments.php', { story_id: story_id, content: text, action: "submit"} );		
		pullStoryComments(story_id);
		$('#commentText').val('');
		$('#commentAuthor').val('');
		return false;
	} );
	
	$('#cancelEdit').click( function() {
		$('#editStoryDiv').slideUp('slow');
		return false;
	} );
	
		$('ul.topic_menu').hide();
		$('ul.location_menu').hide();
		$('ul.newspaper_menu').hide();
		$('ul.viewed_menu').hide();
	
	
		$('ul.recent_menu').hide();
	
	
		$('ul.favorite_menu').hide();
	
	
		$('ul.login_menu').hide();
	
	// Slide down menu
	
   	$(".hoverli1").hover(function () {
    		$('ul.topic_menu').slideDown('fast');
  		},function () {
    		$('ul.topic_menu').slideUp('fast');
  	});
	
	
   	$(".hoverli2").hover(
   		function () {
     		$('ul.location_menu').slideDown('fast');
  		},
  		function () {
     		$('ul.location_menu').slideUp('fast');
  		});
	
	
   	$(".hoverli3").hover(
   		function () {
     		$('ul.newspaper_menu').slideDown('fast');
  		},
  		function () {
     		$('ul.newspaper_menu').slideUp('fast');
  		}
	);
	
	
   	$(".hoverli4").hover(
   		function () {
     		$('ul.viewed_menu').slideDown('fast');
  		},
  		function () {
     		$('ul.viewed_menu').slideUp('fast');
  		}
	);
   	$(".hoverli5").hover(
   		function () {
     		$('ul.recent_menu').slideDown('fast');
  		},
  		function () {
     		$('ul.recent_menu').slideUp('fast');
  		}
	);
	$(".hoverli6").hover(
   		function () {

     		$('ul.favorite_menu').slideDown('fast');
  		},
  		function () {
     		$('ul.favorite_menu').slideUp('fast');
  		}
	);
	
	
   	$(".hoverli7").hover(
   		function () {

     		$('ul.login_menu').slideDown('fast');
  		},
  		function () {
     		$('ul.login_menu').slideUp('fast');
  		}
	);
} );


