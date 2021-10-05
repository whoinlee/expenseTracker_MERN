const express = require('express');
const router = express.Router();

// router.get ('/', (req, res) => res.send("Hi, there! Finally working!!!"));

const { getTransactions, addTransaction, deleteTransaction  } = require('../controllers/transactionController');
router
    .route ('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction);


module.exports = router;