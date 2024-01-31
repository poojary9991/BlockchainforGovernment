var express = require('express');
var router = express.Router();

const bankDetailsController = require('../controllers/bankController')
const businessDetailsController = require('../controllers/businessController')
const govDetailsController = require('../controllers/govDetController')
const eduDetailsController = require('../controllers/educationController')
const medicalDetailsController = require('../controllers/medicalController')
const requestsController = require('../controllers/requestsController')
const searchController = require('../controllers/searchController')
const auth = require('../middlewares/authorize')
const bankFillAuth = require('../middlewares/bankFillAuth')
const busFillAuth = require('../middlewares/busFillAuth')
const eduFillAuth = require('../middlewares/eduFillAuth')
const govFillAuth = require('../middlewares/govFillAuth')
const medFillAuth = require('../middlewares/medFillAuth')


// Bank Details
router.get('/bankDetails/:id', auth, bankDetailsController().retrieveBankDetails)
router.get('/bankDetails', auth, bankDetailsController().retrieveBankDetails)
router.post('/fillBankDetails', auth, bankFillAuth, bankDetailsController().insertBankDetails)
router.get('/fillBankDetails/:uniqueId', auth, bankFillAuth, bankDetailsController().loadBankDetailsForm)
router.get('/fillBankDetails', auth, bankFillAuth, bankDetailsController().loadBankDetailsForm)

// Business Details
router.get('/businessDetails/:id', auth, businessDetailsController().retrieveBusDetails)
router.get('/businessDetails', auth, businessDetailsController().retrieveBusDetails)
router.post('/fillBusinessDetails', auth, busFillAuth, businessDetailsController().insertBusDetails)
router.get('/fillBusinessDetails/:uniqueId', auth, busFillAuth, businessDetailsController().loadBusDetailsForm)
router.get('/fillBusinessDetails', auth, busFillAuth, businessDetailsController().loadBusDetailsForm)

// Government Details
router.get('/govDetails', govDetailsController().loadGovDetails)
router.get('/govDetails/:id', govDetailsController().loadGovDetails)

router.get('/birthDetails/:id', auth, govDetailsController().retrieveBirthDetails)
router.get('/domicileDetails/:id', auth, govDetailsController().retrieveDomicileDetails)
router.get('/incomeDetails/:id', auth, govDetailsController().retrieveIncomeDetails)
router.get('/casteDetails/:id', auth, govDetailsController().retrieveCasteDetails)

router.get('/birthDetails', auth, govDetailsController().retrieveBirthDetails)
router.get('/domicileDetails', auth, govDetailsController().retrieveDomicileDetails)
router.get('/incomeDetails', auth, govDetailsController().retrieveIncomeDetails)
router.get('/casteDetails', auth, govDetailsController().retrieveCasteDetails)

router.post('/fillBirthDetails', auth, govFillAuth, govDetailsController().insertBirthDetails)
router.post('/fillDomicileDetails', auth, govFillAuth, govDetailsController().insertDomicileDetails)
router.post('/fillIncomeDetails', auth, govFillAuth, govDetailsController().insertIncomeDetails)
router.post('/fillCasteDetails', auth, govFillAuth, govDetailsController().insertCasteDetails)

router.get('/fillBirthDetails/:uniqueId', auth, govFillAuth, govDetailsController().loadBirthDetailsForm)
router.get('/fillDomicileDetails/:uniqueId', auth, govFillAuth, govDetailsController().loadDomicileDetailsForm)
router.get('/fillIncomeDetails/:uniqueId', auth, govFillAuth, govDetailsController().loadIncomeDetailsForm)
router.get('/fillCasteDetails/:uniqueId', auth, govFillAuth, govDetailsController().loadCasteDetailsForm)

router.get('/fillBirthDetails', auth, govFillAuth, govDetailsController().loadBirthDetailsForm)
router.get('/fillDomicileDetails', auth, govFillAuth, govDetailsController().loadDomicileDetailsForm)
router.get('/fillIncomeDetails', auth, govFillAuth, govDetailsController().loadIncomeDetailsForm)
router.get('/fillCasteDetails', auth, govFillAuth, govDetailsController().loadCasteDetailsForm)

// Education Details
router.get('/eduDetails/:id', auth, eduDetailsController().retrieveEduDetails)
router.get('/eduDetails', auth, eduDetailsController().retrieveEduDetails)
router.post('/fillEduDetails', auth, eduFillAuth, eduDetailsController().insertEduDetails)
router.get('/fillEduDetails/:uniqueId', auth, eduFillAuth, eduDetailsController().loadEduDetailsForm)
router.get('/fillEduDetails', auth, eduFillAuth, eduDetailsController().loadEduDetailsForm)

// Medical Details
router.get('/medicalDetails/:id', auth, medicalDetailsController().retrieveMedDetails)
router.get('/medicalDetails', auth, medicalDetailsController().retrieveMedDetails)
router.post('/fillMedicalDetails', auth, medFillAuth, medicalDetailsController().insertMedDetails)
router.get('/fillMedicalDetails/:uniqueId', auth, medFillAuth, medicalDetailsController().loadMedicalDetailsForm)
router.get('/fillMedicalDetails', auth, medFillAuth, medicalDetailsController().loadMedicalDetailsForm)

// Requests 
router.post('/grantViewOrFillPer', requestsController().acceptRequests)
router.post('/requestSent', requestsController().requestSent)
router.post('/rejectRequest', requestsController().rejectRequests)
router.get('/sentRequests', requestsController().loadSentRequests)
router.get('/receivedRequests', requestsController().loadReceivedRequests)

// Search Routes
router.post('/search', searchController().searchPost)
router.get('/profile/:uniqueId', searchController().loadSearchProfile)
router.get('/home/:uniqueId', searchController().loadHomeSearchProfile)


module.exports = router;