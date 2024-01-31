const { BusinessContract } = require("../web3/web3Config")

async function isBusFillAuthorized(req, res, next) {

    try {
        const from_address = req.headers.auth;
        const busStatus = await BusinessContract.methods.checkFillRights().call({ from: from_address })

        if (busStatus) {
            return next();
        }

        return res.render('general/notAuthorized');
    } catch (error) {
        res.json(error)
    }

}



module.exports = isBusFillAuthorized;