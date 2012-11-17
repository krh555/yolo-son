$(document).ready( function () {
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