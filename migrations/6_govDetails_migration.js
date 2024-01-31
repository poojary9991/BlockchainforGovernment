const GovDetails = artifacts.require("GovDetails");

module.exports = function (deployer) {
  deployer.deploy(GovDetails);
};
