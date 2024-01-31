const MedicalDetails = artifacts.require("MedicalDetails");

module.exports = function (deployer) {
  deployer.deploy(MedicalDetails);
};
