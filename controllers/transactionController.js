const Transaction = require('../models/transaction');

// @desc     Get all transactions
// @route    GET /api/v1/transactions
// @access   Public
exports.getTransactions = async (req, res, next) => {
    //-- GET /api/v1/transactions
    // res.send('transactionController :: GET transactions');
    
    try {
        const transactions = await Transaction.find();
        console.log("transactionController :: getTransactions", transactions)
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

        /*
        {
            "success": true,
            "count": 0,
            "data": []
        }
        */
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc     Add transaction
// @route    POST /api/v1/transactions
// @access   Public
exports.addTransaction = async (req, res, next) => {
    //-- POST /api/v1/transactions
    // res.send('transactionController :: POST transactions');
    try {
        const { text, amount } = req.body;
        console.log("transactionController :: addransaction, text?? ", text)
        console.log("transactionController :: amount?? ", amount)
        const transaction = await Transaction.create(req.body);
        return res.status(201).json({
            success: true,
            data: transaction
        }); 
    } catch (err) {
        if(err.name === 'ValidationError') {
            //?? ever ??
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
              success: false,
              error: messages   //array of err messages
            });
        } else {
            return res.status(500).json({
              success: false,
              error: 'Server Error'
            });
        }
    }
}

// @desc     Delete transaction
// @route    DELETE /api/v1/transactions/:id
// @access   Public
exports.deleteTransaction = async (req, res, next) => {
    //-- DELETE /api/v1/transactions/:id
    // res.send('transactionController :: DELETE transaction');
    console.log("transactionController :: deleteTransaction, id?? ", req.params.id)
    try {
        const transaction = await Transaction.findById(req.params.id);
        if(!transaction) {
            return res.status(404).json({
              success: false,
              error: 'No transaction found'
            });
        }
      
        await transaction.remove();
      
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}