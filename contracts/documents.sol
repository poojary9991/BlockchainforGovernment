//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

contract AccessControl {
    mapping(address => viewPermission) userViewPermissions;
    mapping(address => fillPermission) fillPermissions;
    address public owner = msg.sender;

    struct viewPermission {
        mapping(address => bool) user;
    }

    struct fillPermission {
        bool bussinessDetails;
        bool governmentDetails;
        bool educationDetails;
        bool medicalDetails;
        bool bankDetails;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    modifier onlyViewPermitted(address ofPerson) {
        require(
            userViewPermissions[ofPerson].user[msg.sender] == true ||
                ofPerson == msg.sender,
            "view permitted error"
        );
        _;
    }

    modifier fillPermittedGovernmentDetails() {
        require(
            fillPermissions[msg.sender].governmentDetails == true,
            "fill permission error"
        );
        _;
    }

    modifier fillPermittedBussinessDetails() {
        require(
            fillPermissions[msg.sender].bussinessDetails == true,
            "fill permission error"
        );
        _;
    }

    modifier fillPermittedEducationDetails() {
        require(
            fillPermissions[msg.sender].educationDetails == true,
            "fill permission error"
        );
        _;
    }

    modifier fillPermittedMedicalDetails() {
        require(
            fillPermissions[msg.sender].medicalDetails == true,
            "fill permission error"
        );
        _;
    }

    modifier fillPermittedBankDetails() {
        require(
            fillPermissions[msg.sender].bankDetails == true,
            "fill permission error"
        );
        _;
    }

    // Grant View Permissions
    function grantViewPermission(address to) internal {
        userViewPermissions[msg.sender].user[to] = true;
    }

    // Grant Fill Permissions
    function grantGovernmentDetailsFillPermisssion(address org)
        internal
        onlyOwner
    {
        fillPermissions[org].governmentDetails = true;
    }

    function grantBussinessDetailsFillPermisssion(address org)
        internal
        onlyOwner
    {
        fillPermissions[org].bussinessDetails = true;
    }

    function grantEducationDetailsFillPermisssion(address org)
        internal
        onlyOwner
    {
        fillPermissions[org].educationDetails = true;
    }

    function grantMedicalDetailsFillPermisssion(address org)
        internal
        onlyOwner
    {
        fillPermissions[org].medicalDetails = true;
    }

    function grantBankDetailsFillPermisssion(address org) internal onlyOwner {
        fillPermissions[org].bankDetails = true;
    }
}

contract GovDetails is AccessControl {
    mapping(address => BC) private userBC;
    mapping(address => DC) private userDC;
    mapping(address => IC) private userIC;
    mapping(address => CC) private userCC;

    struct BC {
        string name;
        string sex;
        string dateOfBirth;
        string placeOfBirth;
        string nameOfFather;
        string nameOfMother;
        string dateOfRegistration;
    }

    struct DC {
        string name;
        string state;
        uint256 serialNo;
        string district;
    }

    struct IC {
        string tahsildarKaryalay;
        string ordinalNo;
        string district;
        string to;
        string year;
        string annualIncome;
    }

    struct CC {
        string daughter_son_of;
        string district;
        string tahsil;
        string to;
        string caste;
    }

    // Grant View Permissions
    function grantViewPermissionLoc(address to) external {
        super.grantViewPermission(to);
    }

    // Grant Fill rights
    function grantGovernmentDetailsFillPermisssionLoc(address org) external {
        super.grantGovernmentDetailsFillPermisssion(org);
    }

    // Check View Rights
    function checkViewRights(address ofPerson) public view returns (bool status) {
        return userViewPermissions[ofPerson].user[msg.sender] == true || ofPerson == msg.sender;
    }

    // Check Fill Rights
    function checkFillRights() public view returns (bool status) {
        return fillPermissions[msg.sender].governmentDetails == true;
    }

    // retrieveDocuments
    function retrieveBC(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory name,
            string memory sex,
            string memory dateOfBirth,
            string memory placeOfBirth,
            string memory nameOfFather,
            string memory nameOfMother,
            string memory dateOfRegistration
        )
    {
        BC memory bcData = userBC[ofPerson];
        // string memory name = userBC[ofPerson].name;
        // string memory sex = userBC[ofPerson].sex;
        // string memory dateOfBirth = userBC[ofPerson].dateOfBirth;
        // string memory placeOfBirth = userBC[ofPerson].placeOfBirth;
        // string memory nameOfFather = userBC[ofPerson].nameOfFather;
        // string memory nameOfMother = userBC[ofPerson].nameOfMother;
        // string memory dateOfRegistration = userBC[ofPerson].dateOfRegistration;

        return (
            bcData.name,
            bcData.sex,
            bcData.dateOfBirth,
            bcData.placeOfBirth,
            bcData.nameOfFather,
            bcData.nameOfMother,
            bcData.dateOfRegistration
        );
    }

    function retrieveDC(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory name,
            string memory state,
            uint256 serialNo,
            string memory district
        )
    {
        string memory name = userDC[ofPerson].name;
        string memory state = userDC[ofPerson].state;
        uint256 serialNo = userDC[ofPerson].serialNo;
        string memory district = userDC[ofPerson].district;

        return (name, state, serialNo, district);
    }

    function retrieveIC(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory tahsildarKaryalay,
            string memory ordinalNo,
            string memory district,
            string memory to,
            string memory year,
            string memory annualIncome
        )
    {
        string memory tahsildarKaryalay = userIC[ofPerson].tahsildarKaryalay;
        string memory ordinalNo = userIC[ofPerson].ordinalNo;
        string memory district = userIC[ofPerson].district;
        string memory to = userIC[ofPerson].to;
        string memory year = userIC[ofPerson].year;
        string memory annualIncome = userIC[ofPerson].annualIncome;

        return (tahsildarKaryalay, ordinalNo, district, to, year, annualIncome);
    }

    function retrieveCC(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory daughter_son_of,
            string memory district,
            string memory tahsil,
            string memory to,
            string memory caste
        )
    {
        string memory daughter_son_of = userCC[ofPerson].daughter_son_of;
        string memory district = userCC[ofPerson].district;
        string memory tahsil = userCC[ofPerson].tahsil;
        string memory to = userCC[ofPerson].to;
        string memory caste = userCC[ofPerson].caste;

        return (daughter_son_of, district, tahsil, to, caste);
    }

    // insertDocuments
    function insertBC(
        string memory name,
        string memory sex,
        string memory dateOfBirth,
        string memory placeOfBirth,
        string memory nameOfFather,
        string memory nameOfMother,
        string memory dateOfRegistration,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedGovernmentDetails {
        userBC[ofPerson] = BC(
            name,
            sex,
            dateOfBirth,
            placeOfBirth,
            nameOfFather,
            nameOfMother,
            dateOfRegistration
        );
    }

    function insertDC(
        string memory name,
        string memory state,
        uint256 serialNo,
        string memory district,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedGovernmentDetails {
        userDC[ofPerson] = DC(name, state, serialNo, district);
    }

    function insertIC(
        string memory tahsildarKaryalay,
        string memory ordinalNo,
        string memory district,
        string memory to,
        string memory year,
        string memory annualIncome,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedGovernmentDetails {
        userIC[ofPerson] = IC(
            tahsildarKaryalay,
            ordinalNo,
            district,
            to,
            year,
            annualIncome
        );
    }

    function insertCC(
        string memory daughter_son_of,
        string memory district,
        string memory tahsil,
        string memory to,
        string memory caste,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedGovernmentDetails {
        userCC[ofPerson] = CC(daughter_son_of, district, tahsil, to, caste);
    }
}

contract EduDetails is AccessControl {
    mapping(address => ED[]) private userED;
    // uint public cnt = 0;

    struct ED {
        string board;
        string name;
        string course;
        string year;
        string seatNo;
        string percentage;
    }

    // return length
    function retLength(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (uint256 length)
    {
        return (userED[ofPerson].length);
    }

    // Grant View Permissions
    function grantViewPermissionLoc(address to) external {
        super.grantViewPermission(to);
    }

    // Grant Fill rights
    function grantEducationDetailsFillPermisssionLoc(address org) external {
        super.grantEducationDetailsFillPermisssion(org);
    }

    // Check View Rights
    function checkViewRights(address ofPerson) public view returns (bool status) {
        return userViewPermissions[ofPerson].user[msg.sender] == true || ofPerson == msg.sender;
    }

    // Check Fill Rights
    function checkFillRights() public view returns (bool status) {
        return fillPermissions[msg.sender].educationDetails == true;
    }

    // retrieve Edu details
    function retrieveED(address ofPerson, uint256 i)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory board,
            string memory name,
            string memory course,
            string memory year,
            string memory seatNo,
            string memory percentage
        )
    {
        // string[] memory board = new string[](cnt);
        // string[] memory name = new string[](cnt);
        // string[] memory course = new string[](cnt);
        // string[] memory year = new string[](cnt);
        // string[] memory seatNo = new string[](cnt);
        // string[] memory percentage = new string[](cnt);

        ED memory ed = userED[ofPerson][i];

        // for (uint i = 0; i < cnt; i++) {
        // ED storage ed = userED[ofPerson][i];
        // board[i] = ed.board;
        // name[i] = ed.name;
        // course[i] = ed.course;
        // year[i] = ed.year;
        // seatNo[i] = ed.seatNo;
        // percentage[i] = ed.percentage;
        // }

        return (
            ed.board,
            ed.name,
            ed.course,
            ed.year,
            ed.seatNo,
            ed.percentage
        );
    }

    // insert education details
    function insertED(
        string memory board,
        string memory name,
        string memory course,
        string memory year,
        string memory stNo,
        string memory percentage,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedEducationDetails {
        userED[ofPerson].push(ED(board, name, course, year, stNo, percentage));
    }
}

contract MedicalDetails is AccessControl {
    mapping(address => MD) private userMD;

    struct MD {
        string tpaName;
        string tpaId;
        string insuredCode;
        string insuredName;
        string prevPolicyNo;
        string mediclaimCpny;
        string insurance;
        string bloodGrp;
    }

    // Grant View Permissions
    function grantViewPermissionLoc(address to) external {
        super.grantViewPermission(to);
    }

    // Grant Fill rights
    function grantMedicalDetailsFillPermisssionLoc(address org) external {
        super.grantMedicalDetailsFillPermisssion(org);
    }

    // Check View Rights
    function checkViewRights(address ofPerson) public view returns (bool status) {
        return userViewPermissions[ofPerson].user[msg.sender] == true || ofPerson == msg.sender;
    }

    // Check Fill Rights
    function checkFillRights() public view returns (bool status) {
        return fillPermissions[msg.sender].medicalDetails == true;
    }

    // retrieve Medical details
    function retrieveMD(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory tpaName,
            string memory tpaId,
            string memory insuredCode,
            string memory insuredName,
            string memory prevPolicyNo,
            string memory mediclaimCpny,
            string memory insurance,
            string memory bloodGrp
        )
    {
        MD storage md = userMD[ofPerson];
        return (
            md.tpaName,
            md.tpaId,
            md.insuredCode,
            md.insuredName,
            md.prevPolicyNo,
            md.mediclaimCpny,
            md.insurance,
            md.bloodGrp
        );
    }

    // insert medical details
    function insertMD(
        string memory tpaName,
        string memory tpaId,
        string memory insuredCode,
        string memory insuredName,
        string memory prevPolicyNo,
        string memory mediclaimCpny,
        string memory insurance,
        string memory bloodGrp,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedMedicalDetails {
        userMD[ofPerson] = MD(
            tpaName,
            tpaId,
            insuredCode,
            insuredName,
            prevPolicyNo,
            mediclaimCpny,
            insurance,
            bloodGrp
        );
    }
}

contract BankDetails is AccessControl {
    mapping(address => BD) private userBD;

    struct BD {
        string ifscCode;
        string acNo;
        string bankName;
        string branch;
    }

    // Grant View Permissions
    function grantViewPermissionLoc(address to) external {
        super.grantViewPermission(to);
    }

    // Grant Fill rights
    function grantBankDetailsFillPermisssionLoc(address org) external {
        super.grantBankDetailsFillPermisssion(org);
    }

    // Check View Rights
    function checkViewRights(address ofPerson) public view returns (bool status) {
        return userViewPermissions[ofPerson].user[msg.sender] == true || ofPerson == msg.sender;
    }

    // Check Fill Rights
    function checkFillRights() public view returns (bool status) {
        return fillPermissions[msg.sender].bankDetails == true;
    }

    // retrieve Bank details
    function retrieveBD(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory ifscCode,
            string memory acNo,
            string memory bankName,
            string memory branch
        )
    {
        string memory ifscCode = userBD[ofPerson].ifscCode;
        string memory acNo = userBD[ofPerson].acNo;
        string memory bankName = userBD[ofPerson].bankName;
        string memory branch = userBD[ofPerson].branch;
        // return userBD[ofPerson];
        return (ifscCode, acNo, bankName, branch);
    }

    // insert Bank details
    function insertBD(
        string memory ifscCode,
        string memory acNo,
        string memory bankName,
        string memory branch,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedBankDetails {
        userBD[ofPerson] = (BD(ifscCode, acNo, bankName, branch));
    }
}

contract BusinessDetails is AccessControl {
    mapping(address => BusDet) private userBusDet;

    struct BusDet {
        string companyName;
        string position;
        string year;
        string salary;
    }

    // Grant View Permissions
    function grantViewPermissionLoc(address to) external {
        super.grantViewPermission(to);
    }

    // Grant Fill rights
    function grantBussinessDetailsFillPermisssionLoc(address org) external {
        super.grantBussinessDetailsFillPermisssion(org);
    }

    // Check View Rights
    function checkViewRights(address ofPerson) public view returns (bool status) {
        return userViewPermissions[ofPerson].user[msg.sender] == true || ofPerson == msg.sender;
    }

    // Check Fill Rights
    function checkFillRights() public view returns (bool status) {
        return fillPermissions[msg.sender].bussinessDetails == true;
    }

    // retrieve Business details
    function retrieveBusDet(address ofPerson)
        public
        view
        onlyViewPermitted(ofPerson)
        returns (
            string memory companyName,
            string memory position,
            string memory year,
            string memory salary
        )
    {
        string memory companyName = userBusDet[ofPerson].companyName;
        string memory position = userBusDet[ofPerson].position;
        string memory year = userBusDet[ofPerson].year;
        string memory salary = userBusDet[ofPerson].salary;
        return (companyName, position, year, salary);
    }

    // insert Business details
    function insertBusDet(
        string memory companyName,
        string memory position,
        string memory year,
        string memory salary,
        address ofPerson // Jiska dekhna hai document
    ) public onlyViewPermitted(ofPerson) fillPermittedBussinessDetails {
        userBusDet[ofPerson] = BusDet(companyName, position, year, salary);
    }
}
