var feedback = require('../app/models/feeadback');

module.exports = {
	update: ({
		function(req, res, next){
	mongoose.model('feedback').find({}, function(err, feedback){
		if(err){
			throw err;
		}
		else{
					return done(null, feedback);
			}
		}
	});
	});
}