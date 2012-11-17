/* User object which represents a site client */

User = function (username, first, last, email) {
    this.username = username;
    this.first = first;
    this.last = last;
    this.email = email;
    
    this.stories = [];
    this.comments = []; 
    this.rating = 0;
}

/*  add/decRating appropriately changes the poster's rating points to reflect the likes and dislikes of his stories and comments from other users */

User.prototype.addRating = function() {
    this.rating++;
}

User.prototype.decRating = function() {
    this.rating--;
}

User.prototype.postStory = function(title, source, user, topic, lat, long, city, country) {
    stories.push(new Story(title, source, user, topic, lat, long, city, country));
}

User.prototype.deleteStory = function(story) {
    this.stories.splice(this.stories.indexOf(story));
}

User.prototype.addComment = function(comment) {
    this.comments.push(comment);
}

User.prototype.deleteComment = function(comment) {
    this.stories.splice(this.stories.indexOf(comment));
}   
