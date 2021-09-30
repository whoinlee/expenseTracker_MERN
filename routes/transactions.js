const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction  } = require('../controllers/transactionController');

// router.get ('/', (req, res) => res.send("Hi, there!"));

router
    .route ('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);


module.exports = router;