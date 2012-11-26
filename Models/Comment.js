//Comment object

Comment.MAX_FLAGS = 10;

var Comment = function (text, username, timestamp, story) {
    this.text = text;
    this.username = username;
    this.timestamp = timestamp;
    this.story = story;

    this.flags = 0;
    this.popularity = 0;
}
var Comment = function (json) {
	json = $.parseJSON(json);
	for( var key in json){
		this[key] = json[key];
	}
}

/* Edit changes text & returns true if comment was succesfully changed, otherwise the user is trying to change someone else's message and it fails */
Comment.prototype.edit = function(text, curUser) {
    if(curUser == this.user) {
        this.text = text;
	return true;
    }
    else return false;
}

/* Increase # of flags on comment and destroy reference if MAX_FLAGS exceeded */
Comment.prototype.flag = function() { 
    this.flags++;
    //if(this.flags > Comment.MAX_FLAGS)
    //	destroy this;
}

/* (Dis)like changes the popularity of the comment accordingly */
Comment.prototype.dislike = function() { 
    this.popularity--;
    this.user.decRating();
}

Comment.prototype.like = function() { 
    this.popularity++;
    this.user.addRating();
}