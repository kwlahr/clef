// DROP DATABASE IF EXISTS users_db;
// CREATE DATABASE users_db;
// USE users_db;
 
// CREATE TABLE users
// (
//     id int NOT NULL AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     age INT,
//     skill_level INT,
//     instrument VARCHAR(100),
//     genre VARCHAR(100),
//     PRIMARY KEY (id)
// );

// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     password: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//     skill_level: DataTypes.INTEGER,
//     instrument: DataTypes.STRING,
//     genre: DataTypes.STRING
//   });
//   return User;
// };

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    skill_level: DataTypes.INTEGER,
    instrument: DataTypes.STRING,
    genre: DataTypes.STRING,
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};