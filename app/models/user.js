"use strict";

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
  	id		    : { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    uname	    : { type: DataTypes.STRING(40), unique: true, allowNull: false},
    password  : { type: DataTypes.STRING(60), allowNull: false},
    createdAt	: { type: DataTypes.DATE, field: 'created_at'},
    updatedAt : { type: DataTypes.DATE, field: 'updated_at'}
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
  		validPassword : function(password, hash_pwd) {
  			return bcrypt.compareSync(password, hash_pwd);
  		},
	    
	    associate: function(models) {
	        User.hasMany(models.note);
	    }
    }
  });

  return User;
};