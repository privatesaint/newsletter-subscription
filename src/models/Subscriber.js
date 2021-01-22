export default (sequelize, Sequelize) => {
  const Subscriber = sequelize.define(
    "subscriber",
    {
      id: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Email is not valid",
          },
        },
      },
    },
    {
      indexes: [
        {
          fields: ["email"],
        },
      ],
    }
  );
  return Subscriber;
};
