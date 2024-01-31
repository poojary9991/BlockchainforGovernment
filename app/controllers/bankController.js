const { BankContract } = require("../web3/web3Config")

// from => msg.sender

function bankDetailsController() {
    return {

        loadBankDetailsForm(req, res) {
            const uniqueId = req.params.uniqueId;
            res.render('formsFill/fillBankDetails', { uniqueId });
        },

        async retrieveBankDetails(req, res) {

            let to_address;

            if(!req.params.id){
                to_address = req.headers.auth;
            } else {
                to_address = req.params.id;
            }
            const from_address = req.headers.auth;
            BankContract.methods.retrieveBD(to_address).call({ from: from_address }).then((response) => {
                const bankDetails = {
                    ifscCode: response.ifscCode,
                    acNo: response.acNo,
                    bankName: response.bankName,
                    branch: response.branch
                }
                res.render('formsGET/getBankDetails', { bankDetails: bankDetails, uniqueId: to_address})
            }).catch(err => res.json(err));
        },

        async insertBankDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            console.log(from_address)
            console.log(to_address)
            const { ifscCode, acNo, bankName, branch } = req.body;
            BankContract.methods.insertBD(ifscCode, acNo, bankName, branch, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                res.redirect(`/bankDetails/${to_address}`);
            }).catch(err => res.json(err));
        }
    }
}

module.exports = bankDetailsController;