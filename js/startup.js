$(document).ready( function () {
	$('#storyFormDiv').hide();
	$('#editStoryDiv').hide();
	$('#addComment').hide();
	gMapInit();
	
	//Register button event handler sends registration request to users.php
	$('#register').click( function() {
		var name = $('#userName').val();
		var pw = $('#password').val();
		pw = CryptoJS.MD5(pw).toString();
		$.post("php/users.php", { userName: name, password: pw, register: "yes" }, function(data) {
			$('#account').append(data);
		} );
	});
	
	//Submit login form button event handler sends login request to users.php
	$('#submitLogin').click( function() {
		var name = $('#userName').val();
		var pw = $('#password').val();
		pw = CryptoJS.MD5(pw).toString();
		$.post("php/users.php", { userName: name, password: pw, login: "yes" }, function(data) {
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
		createStory();
		return false;
	} );
	
	$('#submitEdit').click( function() {
		var id = $('#editStoryId').val();
		edit( id );
		$('#editStoryDiv').slideUp('slow');
		return false;
	} );
	
	$('#submitComment').click( function() {
		var txt = $('#commentText').val();
		var user = $('#commentAuthor').val();
		//var timestamp = event.timeStamp;
		curStory.addComment(txt, new User(user,'','',''), 0);
		pullStoryComments();
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


