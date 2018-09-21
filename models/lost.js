module.exports = function(sequelize, DataTypes) {
  var Lost = sequelize.define('Lost', {
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategory: {
      type: DataTypes.STRING
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
      allowNull: false,
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

  Lost.associate = function(models) {
    Lost.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Lost;
};
