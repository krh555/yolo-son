$(document).ready( function () {
	$('#storyFormDiv').hide();
	$('#editStoryDiv').hide();
	$('#addComment').hide();
	
	//Global variable that holds story object for current story being edited/commented/viewed
	/*var user = new User('kevin','','','');
	curStory = new Story('title', 'source', user, 'topic', 0, 0, 'city', 'country');
	add(curStory);
	curStory.addComment('text', user, 0);
	curStory.addComment('2nd comment', user, 0);*/
	//pullStoryComments();
	
	//Handles displaying create story form on mousing over the map
	$('#map').hover( 
		function(){
			$('#storyFormDiv').show();
		},
		function(){
			$('#storyFormDiv').hide();
		} 
	);
	
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
    		$('ul.topic_menu').slideDown('medium');
  		},function () {
    		$('ul.topic_menu').slideUp('medium');
  	});
	
	
   	$(".hoverli2").hover(
   		function () {
     		$('ul.location_menu').slideDown('medium');
  		},
  		function () {
     		$('ul.location_menu').slideUp('medium');
  		});
	
	
   	$(".hoverli3").hover(
   		function () {
     		$('ul.newspaper_menu').slideDown('medium');
  		},
  		function () {
     		$('ul.newspaper_menu').slideUp('medium');
  		}
	);
	
	
   	$(".hoverli4").hover(
   		function () {
     		$('ul.viewed_menu').slideDown('medium');
  		},
  		function () {
     		$('ul.viewed_menu').slideUp('medium');
  		}
	);
   	$(".hoverli5").hover(
   		function () {
     		$('ul.recent_menu').slideDown('medium');
  		},
  		function () {
     		$('ul.recent_menu').slideUp('medium');
  		}
	);
	$(".hoverli6").hover(
   		function () {
     		$('ul.favorite_menu').slideDown('medium');
  		},
  		function () {
     		$('ul.favorite_menu').slideUp('medium');
  		}
	);
	
	
   	$(".hoverli7").hover(
   		function () {
     		$('ul.login_menu').slideDown('medium');
  		},
  		function () {
     		$('ul.login_menu').slideUp('medium');
  		}
	);
} );


