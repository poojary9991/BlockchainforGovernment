const BusinessDetails = artifacts.require("BusinessDetails");

module.exports = function (deployer) {
  deployer.deploy(BusinessDetails);
};
