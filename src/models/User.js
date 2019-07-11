module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePictureUri: { 
      type: DataTypes.TEXT,
      defaultValue: '../../assets/default_profile.png' 
    }
  });

  User.associate = function (models) {
    User.hasMany(models.PillHistories, {foreignKey: 'code', sourceKey: 'code'})
    User.hasMany(models.PillInfo, {foreignKey: 'code'});

    User.belongsToMany(User, {through: 'UserFavorites', as: 'favorites'});
  }
  return User;
};