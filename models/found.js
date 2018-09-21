module.exports = function(sequelize, DataTypes) {
  var Found = sequelize.define('Found', {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [3, 400]
      }
    },
    claimed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Found.associate = function(models) {
    Found.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Found;
};