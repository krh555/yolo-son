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
	//$mysqli = new mysqli("classroom.cs.unc.edu", "bullock", "CH@ngemenow99Please!bullock", "comp42629db");
	//Set charset so fields can be properly escaped/cleansed to prevent SQL injection
	$mysqli->set_charset("utf8");
	
 	//Check request method
 	if( strcmp($_SERVER['REQUEST_METHOD'], "POST") == 0 ){
 		if( !isset($_SESSION['user_id']) ){
			header("HTTP/1.0 400 Bad Request");
			echo 'Please create an account to create and comment on stories';
			exit();
		}
 		$id = mysqli_real_escape_string($mysqli, $_POST['id']);
	 	if( isset($_POST['action']) ){
	 		switch($_POST['action']) {	 			
				case "like":
					$updateStories = "UPDATE stories
							   SET likes = likes+1
							   WHERE id = " . $id . ";";
					$mysqli->query($updateStories);
					$updateLikes = "INSERT INTO userLikes (user_id, story_id) VALUES('" .
						$_SESSION['user_id'] . "', '" .
						$id . "'
					);";
					$mysqli->query($updateLikes);
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
					$location . "'
				);";
				$mysqli->query($insert_story);
				$select_story = "SELECT * FROM stories WHERE 
			        user_id = '" . $_SESSION['user_id'] . "',
					title = '" . $title . "', 
					url = '" . $url . "',					
					location = '" . $location . "';";
				$result = $mysqli->query($select_story);
				$row = $result->fetch_array(MYSQLI_ASSOC);
				echo json_encode($row);			
			}
		}
	}
	elseif( strcmp($_SERVER['REQUEST_METHOD'], "GET") == 0 ) {
		//TODO add conditional branches checking if each filter is set 
		//and creating appropriate query string for filter
		if( isset($_GET['location']) ){
			//TODO $query = .... location LIKE '%location%'
		}			
		elseif( isset($_GET['likes']) ){
			//TODO $query = query stories with at least given # of likes
		}
		elseif( isset($_GET['comments']) ){
			//TODO $query = query stories with at least given # of comments
		}
		//TODO filters go here if not filter is set all stories are retrieved
		else{
			$query = "SELECT S.*, U.username 
					 FROM stories S, users U 
					 WHERE U.id = S.user_id
					 ORDER BY likes DESC;";
		}
		// END TODO
		//
		//
		//This code packages results for client jquery code
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