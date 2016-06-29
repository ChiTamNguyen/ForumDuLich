var mongoose = require('mongoose');

var feedback = new mongoose.Schema({
	name : String,
	email : String,
	message : String
});

feedback.methods.updatefeedback = function(request, response){

	this.local.name = request.body.name;
	this.local.email = request.body.email;
	this.local.message = request.body.message;
	this.local.save();
	response.redirect('/feedback');
};

mongoose.model('feedback', feedback);