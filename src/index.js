import app from "./app";
import models from "./models";

// app port
const PORT = process.env.PORT || 4500;

models.sequelize.authenticate().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  process.exit(1);
});
