<?php
    if( strcmp($_SERVER['PATH_INFO'], "/run") == 0 ){
	    //Create link to database
		$mysqli = new mysqli("127.0.0.1", "root", "", "news_map_dev");
		//Set charset so fields can be properly escaped/cleansed to prevent SQL injection
		$mysqli->set_charset("utf8");
		
		//Drop all existing tables and print errors if any
		//
		//!!!!WARNING!!!! THIS WILL REMOVE ALL DATA FROM CURRENT TABLES
		//
		$drop_users = "DROP TABLE IF EXISTS users;";
		echo mysqli_error($mysqli);
		$drop_stories = "DROP TABLE IF EXISTS stories;";
		echo mysqli_error($mysqli);
		$drop_comments = "DROP TABLE IF EXISTS comments;";
		echo mysqli_error($mysqli);
		$drop_storyTopics = "DROP TABLE IF EXISTS storyTopics;";
		echo mysqli_error($mysqli);
		$drop_topics = "DROP TABLE IF EXISTS topics;";
		echo mysqli_error($mysqli);
		
		//Execute drop table statements
		$mysqli->query($drop_users);
		$mysqli->query($drop_stories);
		$mysqli->query($drop_comments);
		$mysqli->query($drop_storyTopics);
		$mysqli->query($drop_topics);
		
		//Recreate database tables query strings 
		$users = "CREATE TABLE users(
			id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), 
			name VARCHAR(32) NOT NULL, 
			salt VARCHAR(5) NOT NULL, 
			password VARCHAR(32) NOT NULL,
			account_created date,
			last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			num_posts INTEGER DEFAULT 0,
			likes INTEGER DEFAULT 0
			);";
		$stories = "CREATE TABLE stories(
			id INTEGER NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
			user_id INTEGER NOT NULL,
			url VARCHAR(255) NOT NULL,
			lat DECIMAL(7,4) NOT NULL,
			lng DECIMAL(7,4) NOT NULL,
			location VARCHAR(255) NOT NULL,
			num_comments INTEGER DEFAULT 0,
			posted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			likes INTEGER DEFAULT 0,
			flags INTEGER DEFAULT 0
			);";
		$comments = "CREATE TABLE comments (
	  		id int(11) NOT NULL AUTO_INCREMENT,
	  		user_id int(11) NOT NULL,
	  		story_id int(11) NOT NULL,
	  		content text NOT NULL,
	  		flags int(11) DEFAULT 0,
	  		likes int(11) DEFAULT 0,
	  		PRIMARY KEY (id)
		);";
		$storyTopics = "CREATE TABLE storyTopics (
	  		id int(11) NOT NULL AUTO_INCREMENT,
	  		story_id int(11) NOT NULL,
	  		topic_id int(11) NOT NULL,
	  		PRIMARY KEY (id)
		);";
		$topics = "CREATE TABLE topics (
	  		id int(11) NOT NULL AUTO_INCREMENT,
	  		name varchar(32) NOT NULL,
	  		PRIMARY KEY (id)
		);";
		
		//Execute create table statements and print errors if any
		$mysqli->query($users);
		echo mysqli_error($mysqli);
		$mysqli->query($stories);
		echo mysqli_error($mysqli);
		$mysqli->query($comments);
		echo mysqli_error($mysqli);
		$mysqli->query($storyTopics);
		echo mysqli_error($mysqli);
		$mysqli->query($topics);
		echo mysqli_error($mysqli);
		echo "Script finished report/correct errors if any were printed";
	}
	else{
		echo 'Install mysql and create an account with name="root" and password=""(no password), then create a database called "news_map_dev" <br > ';
		echo "This script creates the required database tables for the application<br ><br >";
		echo "WARNING: ALL TABLES IN THE news_map_dev DATABASE WILL BE DELETED AND RECREATED LOSING ALL STORED DATA<br ><br >";
		echo 'To run the script call it with the path "/run" i.e. ".../dbsetup.php/run" '; 
	}	
?>