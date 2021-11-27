const express = require("express");
const router = express.Router();

//-- step1
// router.get("/", (req, res) =>
//   res.send("Hi, there! We are using express.Router!!!")
// );

//-- step2
// const { getTransactions } = require("../controllers/transactionController");
// router.route("/").get(getTransactions);

//-- step3
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

router.route("/").get(getTransactions).post(addTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;
