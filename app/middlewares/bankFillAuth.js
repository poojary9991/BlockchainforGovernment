const { BankContract } = require("../web3/web3Config")

async function isBankFillAuthorized(req, res, next) {
    try {
        
        const from_address = req.headers.auth;
        const bankStatus = await BankContract.methods.checkFillRights().call({ from: from_address })

        if (bankStatus) {
            return next();
        }

        return res.render('general/notAuthorized');
    } catch (error) {
        res.json(error)
    }

}

module.exports = isBankFillAuthorized;