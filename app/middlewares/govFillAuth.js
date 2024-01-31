const { GovDetContract } = require("../web3/web3Config")

async function isGovFillAuthorized(req, res, next) {

    try {
        const from_address = req.headers.auth;
        const govStatus = await GovDetContract.methods.checkFillRights().call({ from: from_address })

        if (govStatus) {
            return next();
        }

        return res.render('general/notAuthorized');
    } catch (error) {
        res.json(error)
    }

}

module.exports = isGovFillAuthorized;