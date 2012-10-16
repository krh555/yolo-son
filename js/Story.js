//News Story

var Story = function (title, source, user, topic, lat, long, city, country) {
    this.title = title;
    this.source = source;
    this.user = user;
    this.topic = topic;
    this.lat = lat;
    this.long = long;
    this.city = city;
    this.country = country;
    this.discussion = [];
    this.poplarity = 0;
    this.views = 0; 
}

/* Edit attributes of story, title/source/user are immutable */
Story.prototype.editStory(topic, city, country) {
    this.topic = topic;
    this.city = city;
    this.country = country;
}
     

/*  add/decPopularity change popularity of story and user accordingly */
Story.prototype.addPopularity = function() {
    this.popularity = poularity++;
    this.user.addRating();
}

Story.prototype.decPopularity = function() {
    this.popularity = poularity--;
    this.user.decRating();
}

/* increment views of story for each click it has received */
Story.prototype.incViews = function() {
    this.views++;
}

/* Push a comment into the story's discussion array */
Story.prototype.addComment = function(text, user, timestamp) {
    c = new Comment(text, user, timestamp, this);
    this.discussion.push(c);
    user.addComment(c);
}

/* Remove a comment from the discussion, only if the user has selected it */
Story.prototype.deleteComment = function(curUser, comment) {
    if(comment.user == curUser){
        this.discussion.splice(this.discussion.indexOf(comment), 1);
	curUser.deleteComment(comment);
	return true;
    }
    else return false; 
}
     
    
