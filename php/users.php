<?php
	session_start();
	//Ensure both user name and password fields were filled in
	if( !isset($_POST['userName']) || !isset($_POST['password']) ){
		echo 'Please fill in all fields';
	}
	//Save name/password params to local vars for easier use
	$name = $_POST['userName'];
	$pw = $_POST['password'];
	
	//Create link to database
	$mysqli = new mysqli("127.0.0.1", "root", "", "news_map_dev");
	//Set charset so fields can be properly escaped/cleansed to prevent SQL injection
	$mysqli->set_charset("utf8");
	
	//Check if register action was set 
    if( isset($_POST['register']) ){
    	//Generate random 5-char string and hash with preencrypted-password for improved security
    	$salt = rand_string(5);
		$hashedpw = md5( $pw . md5($salt));
		//Get current date in format matching MySQL 'DATE' type
		$date = date('Y-m-d');
		//Sanitize input to prevent SQL injection and create SQL query
		$insertUser = "INSERT INTO users (name, password, salt, account_created) VALUES ('" . $name . "','" . $hashedpw . "','" . $salt . "','" . $date . "');" ;
		//Execute query and handle errors
		if( !($result = $mysqli->query($insertUser)) ){
			 echo "Account creation failed: " . $mysqli->error;
		}
		else{
			//Account succesfully created, get its ID and put it in a session variable to maintain state with client
			$getUserID = "SELECT id FROM users WHERE name LIKE '" . $name . "';";
			//Execute query and store result object
			$result = $mysqli->query($getUserID);
			//Get the lone row of the result object in array form
			$row = $result->fetch_array(MYSQLI_NUM);
			//Store user ID as a session variable so it can be automatically stored with posted stories/comments
			$_SESSION['userID'] = $row[0];
			echo "Account created! Name: " . $name;
		}
	}
	elseif ( isset($_POST['login']) ) {
		//Account succesfully created, get its ID and put it in a session variable to maintain state with client
		$getUserByName = "SELECT * FROM users WHERE name LIKE '" . $name . "';";
		//Execute query and store result object
		$result = $mysqli->query($getUserByName);
		//Convert result into associative array
		$row = $result->fetch_array(MYSQLI_ASSOC);
		//Hash given password using stored salt
		$checkpw = md5( $pw . md5($row['salt']) );
		//Compare given password to password stored in database
		if( strcmp($checkpw, $row['password']) == 0 ){
			//Given password matches stored password, authenticate user
			$_SESSION['userID'] = $row['id'];	
			echo "Welcome back " . $name;
		}
		else echo "Make sure your account information is correct.";
	}
	
	//Create a random string of specified length to be used as the salt in hashing the password
	function rand_string( $length ) {
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
		$str = '';	
		$size = strlen( $chars );
		for( $i = 0; $i < $length; $i++ ) {
			$str .= $chars[ rand( 0, $size - 1 ) ];
		}
		return $str;
	}
	
?>