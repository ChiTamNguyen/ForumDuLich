var mongoose = require('mongoose');

var Thread = mongoose.Schema({
		tenBai		: String,
		noiDung		: String,
		username	: String,
		dateTime	: Date
});