<?php
/* This script controls access between clients and the users table
 * Accepts params (userName, password, action) via POST method
 * action is set to 'register', 'login', or 'logout' 
 * and uses userName, password to execute the corresponding commands
 * Returns/echoes string to be displayed to client indicating result of action  
 */ 
 
 /* TODO
  * 
  * -Add error  handling code to return HTTP error code responses
  * -Add logout action 
  * 
  */
  
	//Start a php session to remember/maintain state with the client
	session_start();
	
	//Ensure both user name and password fields were filled in
	if( !isset($_POST['userName']) || !isset($_POST['password']) ){
		header("HTTP/1.0 400 Bad Request");
		echo 'Please fill in all fields';
		exit();
	}
	//User name or password == "" (no characters)
	if( empty($_POST['userName']) ){
		header("HTTP/1.0 400 Bad Request");
		echo '*Please choose an account name';
		exit();
	}
	//Create link to database
	$mysqli = new mysqli("127.0.0.1", "root", "", "news_map_dev");
	//$mysqli = new mysqli("classroom.cs.unc.edu", "bullock", "CH@ngemenow99Please!bullock", "comp42629db");
	//Set charset so fields can be properly escaped/cleansed to prevent SQL injection
	$mysqli->set_charset("utf8");
	
	//Save name/password params to local vars for ease of use
	$name = $_POST['userName'];
	//Password is encrypted via MD5 on the client side
	$pw = $_POST['password'];
	//Sanitize name input to prevent SQL injection and create SQL query
	$name = mysqli_real_escape_string($mysqli, $name);
	
	switch($_POST['action']){
		//Check if registration button was clicked 
		//If so, create user account with given password
		case "register":
	    	//Generate random 5-char string and hash with preencrypted-password for security
	    	$salt = rand_string(5);
			$hashedpw = md5( $pw . md5($salt) );
			//Get current date in format matching MySQL 'DATE' type (yyyy-mm-dd)
			$date = date('Y-m-d');
			//Create SQL query to insert user
			$insertUser = "INSERT INTO users (username, password, salt, account_created) VALUES ('" . $name . "','" . $hashedpw . "','" . $salt . "','" . $date . "');" ;
			//Execute query and handle errors
			if( !($result = $mysqli->query($insertUser)) ){
				//Name already taken
				echo "Account name already taken";
			}
			else{
				//Account succesfully created, get its ID and put it in a session variable to maintain state with client
				//Execute query and store result object
				$result = $mysqli->query("SELECT id, username FROM users WHERE username = '" . $name . "';");
				//Get the lone row of the result object in array form
				$row = $result->fetch_array(MYSQLI_NUM);
				//Store user ID as a session variable so it can be automatically stored with posted stories/comments
				$_SESSION['user_id'] = $row[0];
				$current_user = array("username" => $row[1], "user_id" => $row[0]);
				echo json_encode($current_user);
			}
			break;
		//Otherwise login button was clicked
		case "login":
			/* Find user with given name
			 * Hash given password with salt recorded for user
			 * Compare to stored password hash
			 * Authenticate or return errors
			 */
			//Find user with given name
			$result = $mysqli->query("SELECT * FROM users WHERE username = '" . $name . "';");
			if( mysqli_num_rows($result) == 0){
				header("HTTP/1.1 404 Not Found");
				echo "Do you have an account?";
				break;
			}
			//Convert result into associative array (key->value pairs)
			$row = $result->fetch_array(MYSQLI_ASSOC);
			//Hash given password using stored salt
			$checkpw = md5( $pw . md5($row['salt']) );
			//Compare given password hash to password hash stored in database
			if( strcmp($checkpw, $row['password']) == 0 ){
				/* Given password matches stored password
				 * Authenticate user by storing their user_id in a session variable
				 * This session variable is client-specific and maintains state with server
				 * It can be used anytime user-made content (stories, comments, etc) requires 
				 * a user id to create a database record
				 */
				$_SESSION['user_id'] = $row['id'];
				$current_user = array("username" => $row['username'], "user_id" => $row['id']);
				//Return greeting
				echo json_encode($current_user);
			}
			else {
				//Passwords do not match, print error to user
				header("HTTP/1.1 401 Unauthorized");
				echo "Make sure your account information is correct.";
				break;
			}
	}
	
	//Create a random string of specified length (to be used as the salt in hashing the password)
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