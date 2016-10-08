var bcrypt 	 = require('bcrypt-nodejs');

var user = {
	// encode password
	generateHash : function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	},

	// check password
	validPassword : function(password, hashpwd) {
		return bcrypt.compareSync(password, hashpwd);
	}

}

module.exports = user;