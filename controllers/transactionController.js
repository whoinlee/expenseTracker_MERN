//-- GET /api/v1/transactions
exports.getTransactions = async (req, res, next) => {
    res.send('GET transactions');
}

//-- POST /api/v1/transactions
exports.addTransaction = async (req, res, next) => {
    res.send('POST transactions');
}

//-- DELETE /api/v1/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
    res.send('DELETE transaction');
}