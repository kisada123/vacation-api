const {
  VACATION_PENDING,
  VACATION_REJECT,
  VACATION_ACCEPTED,
} = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const Vacation = sequelize.define(
    "Vacation",
    {
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          VACATION_PENDING,
          VACATION_REJECT,
          VACATION_ACCEPTED
        ),
        allowNull: false,
        defaultValue: VACATION_PENDING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn("NOW"),
      },
    },

    {
      underscored: true,
    }
  );

  Vacation.associate = (db) => {
    Vacation.belongsTo(db.Admin, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Vacation.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Vacation;
};
