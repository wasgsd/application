
"use strict";

module.exports = function(sequelize, DataTypes){
  var CarriedOverAllowance = sequelize.define("CarriedOverAllowance", {
    year : {
      type      : DataTypes.INTEGER,
      allowNull : false,
    },
    transferred : {
      type      : DataTypes.INTEGER,
      allowNull : false,
    },
    suggested : {
      type      : DataTypes.INTEGER,
      allowNull : false,
    },
  },{
    underscored     : true,
    freezeTableName : true,
    timestamps      : true,
    createdAt       : 'created_at',
    updatedAt       : false,
    indexes : [{
      fields : [ 'user_id' ],
    }],

    classMethods : {

      associate : function(models) {
        CarriedOverAllowance.belongsTo(models.User, {
          as         : 'user',
          foreignKey : 'user_id',
        });
      },

    },

    instanceMethods : { },

  });

  return CarriedOverAllowance;
};
