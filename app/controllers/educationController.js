const { EducationContract } = require("../web3/web3Config")

// from => msg.sender

function educationDetailsController() {
    return {

        loadEduDetailsForm(req, res){
            const uniqueId = req.params.uniqueId;
            res.render('formsFill/fillEduDetails', { uniqueId });
        },

        async retrieveEduDetails(req, res) {

            if(!req.params.id){
                to_address = req.headers.auth;
            } else {
                to_address = req.params.id;
            }

            const from_address = req.headers.auth;
            let cnt = 0;
            let eduDetails = []

            EducationContract.methods.retLength(to_address).call({ from: from_address }).then(async (cntValue) => {
                cnt = Number(cntValue);
                if(cnt === 0){
                    // res.json({ empty: "No data Exists"})
                    res.render('formsGET/getEduDetails', {eduDetails: [], uniqueId: to_address})
                } else {
                    for(let i = 0; i < cnt; i++){
                        const response = await EducationContract.methods.retrieveED(to_address, i).call({ from: from_address })
                        eduDetails.push({
                            board: response.board, 
                            name: response.name, 
                            course: response.course, 
                            year: response.year, 
                            seatNo: response.seatNo, 
                            percentage: response.percentage
                        })
                    }
                    // res.json(eduDetails)
                    res.render('formsGET/getEduDetails', {eduDetails: eduDetails, uniqueId: to_address})
                }
            })
            .catch(err => res.json(err));

        },

        insertEduDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const { board, name, course, year, stNo, percentage } = req.body;
            EducationContract.methods.insertED(board, name, course, year, stNo, percentage, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                res.redirect(`/eduDetails/${to_address}`);
            }).catch(err => res.send(err));
        }
    }
}

module.exports = educationDetailsController;