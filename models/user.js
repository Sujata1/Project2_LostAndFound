module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true,
      validate: {
        len: [3, 15]
      }
    },
    lastname: {
      type: DataTypes.TEXT,
      notEmpty: true,
      validate: {
        len: [3, 15]
      }
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [3, 15]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    last_login: {
      type: DataTypes.DATE
    }
    // },
    // status: {
    //   type: sequelize.ENUM('active','inactive'),
    //   defaultValue:'active'
    // }
  });

  User.associate = function(models) {
    User.hasMany(models.Claim, {
      foreignKey: {
        allowNull: false
      }
    });
    User.hasMany(models.Lost, {
      foreignKey: {
        allowNull: false
      }
    });
    User.hasMany(models.Found, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  

  return User;
};
