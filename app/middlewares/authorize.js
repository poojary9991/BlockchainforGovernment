const { BankContract, BusinessContract, GovDetContract, EducationContract, MedicalContract } = require("../web3/web3Config")

async function isAuthorized(req, res, next) {
    try {

        let to_address;

        // console.log('in auth')
            if(!req.params.id){

                to_address = req.headers.auth;
            } else {
                // console.log('else params') 
                to_address = req.params.id;
            }

            const from_address = req.headers.auth;
            // console.log(from_address)
            // console.log(to_address)
            const govStatus = await GovDetContract.methods.checkViewRights(to_address).call({ from: from_address })
            const bankStatus = await BankContract.methods.checkViewRights(to_address).call({ from: from_address })
            const busStatus = await BusinessContract.methods.checkViewRights(to_address).call({ from: from_address })
            const eduStatus = await EducationContract.methods.checkViewRights(to_address).call({ from: from_address })
            const medStatus = await MedicalContract.methods.checkViewRights(to_address).call({ from: from_address })

            if(govStatus && bankStatus && busStatus && eduStatus && medStatus){
                return next();
            }

            return res.render('general/notAuthorized');

    } catch (error) {
        res.json(error)
    }


}



module.exports = isAuthorized;