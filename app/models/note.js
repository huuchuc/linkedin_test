"use strict";

module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("note", {
  	id		      : { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    title	      : {type : DataTypes.STRING, allowNull: false},
    content     : DataTypes.TEXT,
    version	    : DataTypes.BIGINT,
    user_id     : DataTypes.BIGINT,
    createdAt   : {type: DataTypes.DATE, field: 'created_at'},
    updatedAt   : {type: DataTypes.DATE, field: 'updated_at'}
  }, {
    //set the timestamps to be underscored: (created_at, updated_at)
    underscored : true,
    timestamps  : true,
    tableName   : 'notes',

    classMethods: {
      associate: function(models) {
        Note.belongsTo(models.user);
      }
    }
  });

  return Note;
};