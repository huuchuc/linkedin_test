"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
  	id		: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    uname	: { type: DataTypes.STRING, allowNull: false},
    password: DataTypes.STRING(60),
    createdAt	: {type: DataTypes.DATE, field: 'created_at'},
    updatedAt   : {type: DataTypes.DATE, field: 'updated_at'}
  }, {
  	//set the timestamps to be underscored: (created_at, updated_at)
    underscored	: true,
    timestamps  : true,
    tableName:   'users',
    classMethods: {
    	// encode password
		generateHash : function(password) {
			return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
		},

		// check password
		validPassword : function(password) {
			return bcrypt.compareSync(password, this.password);
		},
	    
	    associate: function(models) {
	        User.hasMany(models.note);
	    }
    }
  });

  return User;
};