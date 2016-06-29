var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs'); 

var userSchema = mongoose.Schema({
	local 			: {
		name		: String,
		username	: String,
		password	: String,
		email		: String,
		address		: String,
		phone		: String
	}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.updateUser = function(request, response){

	this.local.name = request.body.name;
	this.local.address = request.body.address;
	this.local.email = request.body.email;
	this.local.password = request.body.password;
	this.local.phone = request.body.phone;
	this.local.save();
	response.redirect('/user');
};

module.exports = mongoose.model('User', userSchema);