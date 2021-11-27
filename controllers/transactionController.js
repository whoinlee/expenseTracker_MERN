const Transaction = require("../models/Transaction");

// @desc     Get all transactions
// @route    GET /api/v1/transactions
// @access   Public
exports.getTransactions = async (req, res, next) => {
  //-- step1
  //-- http://localhost:5000/api/v1/transactions (w. GET) in postman
  //-- GET /api/v1/transactions
  //   res.send("controllers/transactionController.js :: GET transactions");

  //-- step2
  try {
    const transactions = await Transaction.find(); //-- using mongoDB
    console.log("transactionController :: getTransactions", transactions);
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
    /*sample response
      {
          "success": true,
          "count": 0,
          "data": []
      }
      //
      {
        "success": true,
        "count": 6,
        "data": [
        {
            "_id": "615c98dbae3acd676a635171",
            "text": "iPad",
            "amount": -500,
            "createdAt": "2021-10-05T18:26:35.057Z",
            "__v": 0
        },
        {
            "_id": "615c9944ae3acd676a635176",
            "text": "camera",
            "amount": -200,
            "createdAt": "2021-10-05T18:28:20.173Z",
            "__v": 0
        },
        {
            "_id": "615c997aae3acd676a635178",
            "text": "monitor",
            "amount": -750,
            "createdAt": "2021-10-05T18:29:14.079Z",
            "__v": 0
        },
        {
            "_id": "615c9be4812118a4a3f0feb7",
            "text": "iPhone",
            "amount": -1009,
            "createdAt": "2021-10-05T18:39:32.767Z",
            "__v": 0
        },
        {
            "_id": "615c9c02812118a4a3f0febb",
            "text": "gift",
            "amount": 10000,
            "createdAt": "2021-10-05T18:40:02.295Z",
            "__v": 0
        },
        {
            "_id": "615cb53a11fb99dd63ffd643",
            "text": "cash gift",
            "amount": 3000,
            "createdAt": "2021-10-05T20:27:38.744Z",
            "__v": 0
        }]
      }
    */
  } catch (err) {
    return res.status(500).json({
      //--500: server error
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Add transaction
// @route    POST /api/v1/transactions
// @access   Public
exports.addTransaction = async (req, res, next) => {
  //-- step1
  //-- http://localhost:5000/api/v1/transactions (w. POST) in postman
  //-- POST /api/v1/transactions
  //   res.send("controllers/transactionController.js :: POST transaction");

  //-- step2
  try {
    const { text, amount } = req.body;
    console.log(
      "controllers/transactionController.js :: addransaction, text?? ",
      text
    );
    console.log("controllers/transactionController.js :: amount?? ", amount);
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      //-- 201: success http status
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        //-- 400: client error
        success: false,
        error: messages, //-- array of err messages
      });
      /*
      {
          "success":false,
          "error":["Please add a positive or negative number","Please add some text"]}
      */
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc     Delete transaction
// @route    DELETE /api/v1/transactions/:id
// @access   Public
exports.deleteTransaction = async (req, res, next) => {
  //-- step1
  //-- http://localhost:5000/api/v1/transactions/:123 (w. DELETE) in postman
  //-- DELETE /api/v1/transactions/:id
  //   res.send("controllers/transactionController.js :: DELETE transaction");
  //   console.log(
  //     "controllers/transactionController.js :: deleteTransaction, id?? ",
  //     req.params.id
  //   );

  //-- step2
  try {
    const transaction = await Transaction.findById(req.params.id); /***/
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove(); /***/

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
