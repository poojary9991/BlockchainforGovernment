const Request = require('../models/request')
const { BankContract, BusinessContract, GovDetContract, EducationContract, MedicalContract, AccessContract } = require("../web3/web3Config")

function requestsController() {
    return {
        async requestSent(req, res) {
            try {
                const senderAddress = req.headers.auth;
                const sent_to = req.body.sent_to;

                const senderDoc = await Request.findOneAndUpdate(
                    { address: senderAddress.toLowerCase() },
                    { $push: { sent: sent_to.toLowerCase() } },
                    { new: true, upsert: true }
                );

                const receiverDoc = await Request.findOneAndUpdate(
                    { address: sent_to.toLowerCase() },
                    { $push: { received: senderAddress.toLowerCase() } },
                    { new: true, upsert: true }
                );

                res.status(200).redirect("/sentRequests")
                // res.json(senderDoc, receiverDoc)

            } catch (err) {
                res.json(err)
            }
        },

        async loadSentRequests(req, res) {
            try {
                const address = req.headers.auth;

                const requestsObj = await Request.findOne(
                    { address: new RegExp(`^${address}$`, 'i') },
                );

                // res.status(200).json("success")
                res.render('requests/sent', 
                {sentArr : requestsObj===null?[] : requestsObj.sent})

            } catch (err) {
                res.json(err)
            }
        },

        async loadReceivedRequests(req, res) {
            try {
                const address = req.headers.auth;

                ownerAddress = await AccessContract.methods.owner().call();

                const requestsObj = await Request.findOne(
                    { address: new RegExp(`^${address}$`, 'i') },
                );

                // res.status(200).json("success")
                if(ownerAddress.toLowerCase() === address.toLowerCase()){
                    res.render('requests/received', 
                    {receivedArr : requestsObj===null?[] : requestsObj.received, owner: true})
                } else {
                    res.render('requests/received', 
                    {receivedArr : requestsObj===null?[] : requestsObj.received, owner: false})
                } 

            } catch (err) {
                console.log(err)
                res.json(err)
            }
        },

        async acceptRequests(req, res) {
            try {
                const from_address = req.headers.auth;   //sender
                const { to_address, per_type } = req.body;  // kiski accept ki

                if (per_type === "view") {
                    try {
                        console.log("Calling Contracts")
                        medResponse = await MedicalContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                        govResponse = await GovDetContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                        eduResponse = await EducationContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                        busResponse = await BusinessContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                        bankResponse = await BankContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });

                    const afterAccepted1 = await Request.findOneAndUpdate(
                        { address: new RegExp(`^${from_address}$`, 'i') },
                        {
                            $pullAll: {
                                received: [to_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted1)

                    const afterAccepted2 = await Request.findOneAndUpdate(
                        { address: new RegExp(`^${to_address}$`, 'i') },
                        {
                            $pullAll: {
                                sent: [from_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted2)

                    res.redirect('/receivedRequests')
                    // res.json(afterAccepted1, afterAccepted2)
                } catch (error) {
                    res.json(error)
                }
                    
                } else if (per_type === "fill") {
                    const { forDomain } = req.body;

                    if(forDomain === "medical"){
                        medPer = await MedicalContract.methods.grantMedicalDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "government"){
                        govPer = await GovDetContract.methods.grantGovernmentDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "education"){
                        eduPer = await EducationContract.methods.grantEducationDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "business"){
                        busPer = await BusinessContract.methods.grantBussinessDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "bank"){
                        bankPer = await BankContract.methods.grantBankDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    }
                    
                    const afterAccepted1 = await Request.findOneAndUpdate(
                        { address: new RegExp(`^${from_address}$`, 'i') },
                        {
                            $pullAll: {
                                received: [to_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted1)

                    const afterAccepted2 = await Request.findOneAndUpdate(
                        { address: new RegExp(`^${to_address}$`, 'i') },
                        {
                            $pullAll: {
                                sent: [from_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted2)

                    res.redirect('/receivedRequests')
                    // res.json(afterAccepted1, afterAccepted2)

                }

            } catch (err) {
                res.json(err)
            }

        },

        async rejectRequests(req, res) {
            try {
                const from_address = req.headers.auth;   
                const { to_address } = req.body;

                const afterRejected1 = await Request.findOneAndUpdate(
                    { address: new RegExp(`^${from_address}$`, 'i') },
                    {
                        $pullAll: {
                            received: [to_address],
                        }
                    },
                    { new: true }
                );

                console.log(afterRejected1)

                const afterRejected2 = await Request.findOneAndUpdate(
                    { address: new RegExp(`^${to_address}$`, 'i') },
                    {
                        $pullAll: {
                            sent: [from_address],
                        }
                    },
                    { new: true }
                );

                console.log(afterRejected2)

                res.redirect('/receivedRequests')
                // res.json("request successfully Rejected")
                // res.json(afterRejected1, afterRejected2)

            } catch (error) {
                res.json(error)
            }
        }
    }
}


module.exports = requestsController