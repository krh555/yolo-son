$(document).ready( function () {
//Register button event handler sends registration request to users.php
	$('#register').click( function() {		
		//Get form input from #loginForm in #account div
		var name = $('#userName').val();
		if( name === "" )
			alert("Please enter a user name");
		var pw = $('#password').val();
		if( pw === "" )
			alert("Please enter a password");
		//MD5 encrypt password before sending it to the server
		pw = CryptoJS.MD5(pw).toString();
		//Called users.php script with register action to create a new account
		// !!! FIX ERROR HANDLING HERE AND IN users.php !!!
		$.ajax({
			url: "php/users.php", 
			type: "POST",
			data: { userName: name, password: pw, action: "register" }, 
			success: function(data) {
				//Take JSON encoded (username, id) and fill in current_user var
				current_user = new User(data);
				$('#account').append('<h4>Account successfully created. Name: ' + current_user.username + '</h4>');
				$('#loginForm').hide();
				getStories();
			},
			error: function(data) {
				$('#account').append(data);	
			}
		} );
	});
	
	//Submit login form button event handler sends login request to users.php
	$('#submitLogin').click( function() {
		//Get form input from #loginForm in #account div
		var name = $('#userName').val();
		if( name === "" )
			alert("Please enter a user name");
		var pw = $('#password').val();
		if( pw === "" )
			alert("Please enter a password");
		//MD5 encrypt password before sending it to the server
		pw = CryptoJS.MD5(pw).toString();
		//Call users.php with login action set to authenticate existing user account
		// !!! FIX ERROR HANDLING HERE AND IN users.php !!!
		/*$.ajax({
			url: "php/users.php",
			type: "POST"
		});*/
		$.post("php/users.php", { userName: name, password: pw, action: "login" }, function(data) {
			current_user = new User(data);			
			$('#account').append('<h4>Welcome back ' + current_user.username + '</h4>');
			$('#loginForm').hide();
			current_user.getLikes();
			getStories();
		} );
	});
} );


/* User object which represents a site client */
var User = function (username, id, likes) {
    this.username = username;
	this.id = id;
	this.likes = new Array(); 
}

var User = function(json) {
	json = $.parseJSON(json);
	for( var key in json){
		this[key] = json[key];
	}
	this.likes = new Array();
}

var addLike = function(story_id){
	current_user.likes.push(story_id);
}

//Retrieve array of ids for stories this user has liked
User.prototype.getLikes = function() {
	//var ret = new Array();
	$.ajax({
		url: "php/users.php", 
		type: "GET",
		data: { action: "likes", user_id: this.id }, 
		success: function(s_id_array) {
			s_id_array = $.parseJSON(s_id_array);
			current_user.likes = s_id_array;
		},
		error: function(data) {
			$('#account').append(data);	
		}
	} );		
}
