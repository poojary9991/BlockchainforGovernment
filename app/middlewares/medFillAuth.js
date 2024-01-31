const { MedicalContract } = require("../web3/web3Config")

async function isMedFillAuthorized(req, res, next) {

    try {
        const from_address = req.headers.auth;
        const medStatus = await MedicalContract.methods.checkFillRights().call({ from: from_address })

        if (medStatus) {
            return next();
        }

        return res.render('general/notAuthorized');
    } catch (error) {
        res.json(error)
    }

}

module.exports = isMedFillAuthorized;