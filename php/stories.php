<?php
/* This script controls client access to stories db table
 * If HTTP method is 'POST', then
 * It looks for a path variable corresponding to the integer of a story
 * to be editted. To edit a story (title, url, lat, lng, location) params can be passed. 
 * If no path var is provided, then a new story record will
 * be inserted into the 'stories' table and a JSON encoded story object
 * will be returned. Requires (title, url, lat, lng, location) 
 * 
 * If HTTP method is 'GET', then
 * 	
 */
   
	//Start a php session to access client state/session variables
	session_start();
	$MAX_FLAGS = 10;
	//Create link to database
	$mysqli = new mysqli("127.0.0.1", "root", "", "news_map_dev");
	//Set charset so fields can be properly escaped/cleansed to prevent SQL injection
	$mysqli->set_charset("utf8");
	
 	//Check request method
 	if( strcmp($_SERVER['REQUEST_METHOD'], "POST") == 0 ){
 		$id = mysqli_real_escape_string($mysqli, $_POST['id']);
	 	if( isset($_POST['action']) ){
	 		switch($_POST['action']) {	 			
				case "like":
					$update = "UPDATE stories
							   SET likes = likes+1
							   WHERE id = " . $id . ";";
					$mysqli->query($update);
					break;
				case "flag":
					$update = "UPDATE stories
							   SET flags = flags+1
							   WHERE id = " . $id . ";";							
					$mysqli->query($update);
					$result = $mysqli->query("SELECT flags FROM stories WHERE id =" . $_POST['id'] . ";");
					$row = $result->fetch_array(MYSQLI_NUM);
					//Delete story if it is over its flagging capacity
					if( $row[0] > $MAX_FLAGS ){
						$mysqli->query("DELETE FROM stories WHERE id =" . $_POST['id'] . ";");
					}
					break;
	 		}
		}
		else {
			//Sanitize all parameters to prevent SQL injection
			$title = mysqli_real_escape_string( $mysqli, $_POST['title'] );
			$url = mysqli_real_escape_string( $mysqli, $_POST['url'] );
			$lat = mysqli_real_escape_string( $mysqli, $_POST['lat'] );
			$lng = mysqli_real_escape_string( $mysqli, $_POST['lng'] );
			$location = mysqli_real_escape_string( $mysqli, $_POST['location'] );
			//Check if path variable is null, if so create a new story record
			if( strcmp($_SERVER['PATH_INFO'], "") == 0 ){			
				//Create query string with form params	
				$insert_story = "INSERT INTO stories (user_id, title, url, lat, lng, location) VALUES('" .
					$_SESSION['user_id'] . "', '" .
					$title . "', '" .
					$url . "', '" .
					$lat . "', '" .
					$lng . "', '" .
					$location . "						
				');";
				$mysqli->query($insert_story);
			}
		}
	}
	elseif( strcmp($_SERVER['REQUEST_METHOD'], "GET") == 0 ) {
		$query = "SELECT S.*, U.username 
				 FROM stories S, users U 
				 WHERE U.id = S.user_id
				 ORDER BY likes DESC;";
		$result = $mysqli->query($query);
		//Array which holds JSON encoded story objects to be returned to client
		$json_stories = array();
		//Convert each row of result into associative array (key->value pairs)
		while( $row = $result->fetch_array(MYSQLI_ASSOC) ){
			//Strip HTML tags and convert special chars to their HTML encoding
			//to prevent Cross-Site Scripting (HTML content won't be displayed as HTML)
			foreach($row as $key => $val){				
				$val = strip_tags($val);
				$val = htmlentities($val);
				$row[$key] = $val;
			}
			//Push json encoded story record into return array
			array_push( $json_stories, json_encode($row) );	
		}
		echo json_encode($json_stories);
	}
 
?>