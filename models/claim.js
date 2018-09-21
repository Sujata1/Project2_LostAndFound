module.exports = function (sequelize, DataTypes) {
  var Claim = sequelize.define('Claim', {
    itemType: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Claim.associate = function(models) {
    Claim.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    
    Claim.belongsTo(models.Lost, {
      foreignKey: {
        allowNull: true
      }
    });

    Claim.belongsTo(models.Found, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Claim;
};
