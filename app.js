const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));
const dotenv = require("dotenv");
dotenv.config();
const { createConnection } = require("./config/connection");
const { undefinedRoute, errorHandler } = require("./middlewares/errorHandler");
const { userAuthRouter } = require("./routes/userAuthRoute");
const { courseRouter } = require("./routes/courseRoute");
const { cartRouter } = require("./routes/cartRoute");
createConnection();

app.use(userAuthRouter);
app.use(courseRouter);
app.use(cartRouter);
app.use(undefinedRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Listening to the port ${PORT}`);
});
