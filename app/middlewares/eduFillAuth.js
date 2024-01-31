const { EducationContract } = require("../web3/web3Config")

async function isEduFillAuthorized(req, res, next) {

    try {
        const from_address = req.headers.auth;
        const eduStatus = await EducationContract.methods.checkFillRights().call({ from: from_address })

        if (eduStatus) {
            return next();
        }

        return res.render('general/notAuthorized');
    } catch (error) {
        res.json(error)
    }

}

module.exports = isEduFillAuthorized;