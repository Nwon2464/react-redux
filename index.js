const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middleware = require("./middleware");
const router = require("./routes");

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongo DB Atlas has been connected! 👏");
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.use("/posts", router);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on PORT 5000 ❤😊👏");
});
