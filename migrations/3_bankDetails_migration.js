const BankDetails = artifacts.require("BankDetails");

module.exports = function (deployer) {
  deployer.deploy(BankDetails);
};
