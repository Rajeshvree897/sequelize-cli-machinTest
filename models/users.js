'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userRole: {
     type: DataTypes.STRING,
     defaultValue : "1"
    },
    hobbies: {
        type:DataTypes.JSON,
        defaultValue:[]
    },
    gender: DataTypes.STRING,
    profilePic: {
      type : DataTypes.STRING,
    defaultValue : null
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};