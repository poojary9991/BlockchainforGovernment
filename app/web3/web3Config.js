const bankABI = require("../../build/contracts/BankDetails.json").abi
const businessABI = require("../../build/contracts/BusinessDetails.json").abi
const govABI = require("../../build/contracts/GovDetails.json").abi
const eduABI = require("../../build/contracts/EduDetails.json").abi
const medABI = require("../../build/contracts/MedicalDetails.json").abi
const accABI = require("../../build/contracts/AccessControl.json").abi

// web3 interface
Web3 = require("web3");

// setup a http provider
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Connecting to smart contract
// creating instances
const AcAddress = '0x7Ce69ee1bfCeF78bD390448160F569441AD91a5a';
const BankAddress = '0xFEefbCcc84Ed69944000d537994528247313D7B3';
const BusAddress = '0xb61F55f74620FC5e1d3F8a7E5A5043D672B97A36';
const EduAddress = '0xA9B2B8569A75f00b7d932cc8f694FA6EF809a91E';
const GovAddress = '0x2911cBBB30F4319482FbE51C71978DbC63Cad9F7';
const MedAddress = '0x79BeB7586560B8d02Ecb4dfE636FEa13BaA0E39e';

let BankContract = new web3.eth.Contract( bankABI, BankAddress );
let BusinessContract = new web3.eth.Contract( businessABI, BusAddress);
let GovDetContract = new web3.eth.Contract( govABI, GovAddress);
let EducationContract = new web3.eth.Contract( eduABI, EduAddress);
let MedicalContract = new web3.eth.Contract( medABI, MedAddress);
let AccessContract = new web3.eth.Contract( accABI, AcAddress);

module.exports = { BankContract, BusinessContract, GovDetContract, EducationContract, MedicalContract, AccessContract}