// const Sequelize = require("sequelize");
const Post = require("./post.js");
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define(
    "Post",
    {
      postID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: DataTypes.STRING,
      subject: DataTypes.STRING,
      body: DataTypes.STRING,
      tags: {
        type: DataTypes.STRING,
        allowNull: true
      }
      // created_at: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW
      // },
      // updated_at: {
      //   type: DataTypes.DATE,
      //   defaultValue: DataTypes.NOW,
      //   allowNull: true
      // }
    },
    {
      timestamps: false
    }
  );

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: { allowNull: true }
    });
  };
  return Post;
};
