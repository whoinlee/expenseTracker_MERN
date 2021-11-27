const path = require("path");
const express = require("express"); //-- web framework
const dotenv = require("dotenv"); //-- for global variables: PORT, dataBaseURL etc. loads environment variables from a .env file into process.env
const morgan = require("morgan"); //-- for logging: HTTP request logger middleware for node.js
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

//-- step3 (using mongoDB)
connectDB();

const app = express(); //-- initialize an express app
//-- step1
// app.get("/", (req, res) => res.send("Hello WhoIN Lee, Nov 27/2021"));
//===> app.use (using Router)

//-- step4
app.use(express.json()); //-- allows to use bodyParser

//-- step5 (using morgan)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//-- step2 (using router)
const transactions = require("./routes/transactions"); //-- using express.Router
app.use("/api/v1/transactions", transactions);

//-- step6 : production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //-- '*':anything except for the api routes, '/api/v1/transactions'
  //-- currentDir(__) >> client folder >> build folder >> index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
