const { MedicalContract } = require("../web3/web3Config")

// from => msg.sender

function medicalDetailsController() {
    return {

        loadMedicalDetailsForm(req, res){
            const uniqueId = req.params.uniqueId;
            res.render('formsFill/fillMedicalDetails', { uniqueId });
        },

        retrieveMedDetails(req, res) {

            let to_address;

            if(!req.params.id){
                to_address = req.headers.auth;
            } else {
                to_address = req.params.id;
            }
            const from_address = req.headers.auth;
            MedicalContract.methods.retrieveMD(to_address).call({ from: from_address }).then((response) => {
                const medDetails = {
                    tpaName: response.tpaName,
                    tpaId: response.tpaId,
                    insuredCode: response.insuredCode,
                    insuredName: response.insuredName,
                    prevPolicyNo: response.prevPolicyNo,
                    mediclaimCpny: response.mediclaimCpny,
                    insurance: response.insurance,
                    bloodGrp: response.bloodGrp
                }
                res.render('formsGET/getMedicalDetails', { medDetails: medDetails, uniqueId: to_address})
            }).catch(err => res.json(err));
        },

        insertMedDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const {
                tpaName,
                tpaId,
                insuredCode,
                insuredName,
                prevPolicyNo,
                mediclaimCpny,
                insurance,
                bloodGrp
            } = req.body;

            MedicalContract.methods.insertMD(tpaName, tpaId, insuredCode, insuredName, prevPolicyNo, mediclaimCpny, insurance, bloodGrp, to_address)
                .send({ from: from_address, gas: 3000000 })
                .then((response) => {
                    res.redirect(`/medicalDetails/${to_address}`);
                }).catch(err => res.json(err));
        }
    }
}

module.exports = medicalDetailsController;