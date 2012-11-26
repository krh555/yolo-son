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
				$('#account').append(data);
				$('#loginForm').hide();
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
		$.post("php/users.php", { userName: name, password: pw, action: "login" }, function(data) {
			$('#account').append(data);
			$('#loginForm').hide();
		} );
	});
} );