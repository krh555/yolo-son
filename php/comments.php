<?php
    session_start();
	//Create link to database
	//$mysqli = new mysqli("127.0.0.1", "root", "", "news_map_dev");
	$mysqli = new mysqli("classroom.cs.unc.edu", "bullock", "CH@ngemenow99Please!bullock", "comp42629db");
	//Set charset so fields can be properly escaped/cleansed to prevent SQL injection
	$mysqli->set_charset("utf8");
	
	if( strcmp($_SERVER['REQUEST_METHOD'], "POST") == 0 ){
		switch($_POST['action']){
			case "submit":
				$content = mysqli_real_escape_string( $mysqli, $_POST['content'] );
				$story_id = mysqli_real_escape_string( $mysqli, $_POST['story_id'] );
				$insert = "INSERT INTO comments (user_id, story_id, content) VALUES('" .
						   $_SESSION['user_id'] . "', '" .
						   $story_id . "' , '" .
						   $content . "');";
				$mysqli->query($insert);
				$update = "UPDATE stories
						   SET num_comments = num_comments+1
					   	   WHERE id = " . $story_id . ";";
				$mysqli->query($update);
										   
				break;
		}
	}
	elseif( strcmp($_SERVER['REQUEST_METHOD'], "GET") == 0 ){
		$story_id = mysqli_real_escape_string( $mysqli, $_GET['story_id'] );
		$query = "SELECT C.*, U.username
				  FROM comments C, users U
				  WHERE C.user_id = U.id 
				  	AND C.story_id='" . $story_id . "';";
		$result = $mysqli->query($query);
		echo mysqli_error($mysqli);
		//Array which holds JSON encoded story objects to be returned to client
		$json_comments = array();
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
			array_push( $json_comments, json_encode($row) );	
		}
		echo json_encode($json_comments);
	}
?>