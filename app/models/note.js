"use strict";

module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("note", {
  	id		  : { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    title	  : {type : DataTypes.STRING, allowNull: false},
    content : DataTypes.TEXT,
    version	: DataTypes.BIGINT,
    user_id : DataTypes.BIGINT
  }, {
    underscored: false,
    tableName:   'notes',

    classMethods: {
      associate: function(models) {
        Note.belongsTo(models.user);
      }
    }
  });

  return Note;
};