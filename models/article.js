// const Sequelize = require("sequelize");
const Article = require("./article.js");
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define(
    "Article",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      body: DataTypes.STRING,
      tagList: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      timestamps: false
    }
  );

  Article.associate = function(models) {
    Article.belongsTo(models.User, {
      foreignKey: { allowNull: true }
    });
  };
  return Article;
};
