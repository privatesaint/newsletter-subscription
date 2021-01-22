import models from "../../models";

const { sequelize, subscriber } = models;

sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));
(async () => {
  try {
    await sequelize.sync({ alter: true });
    await subscriber.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
})();
