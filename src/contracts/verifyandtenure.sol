// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DocumentVerification {
    address public owner;

    struct Document {
        string hash;
        bool isValid;
    }
    struct Employee {
        uint256 startDate;
        uint256 endDate;
    }


    mapping(address => Document[]) public userDocuments;
    mapping(address => Employee) public employeeTenures;

    event DocumentAdded(address indexed user, string indexed documentHash);
    event DocumentVerified(address indexed user, string indexed documentHash, bool isValid);
    event EmployeeTenureSet(address indexed user, uint256 startDate, uint256 endDate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addDocument(address _user, string memory _documentHash) external onlyOwner {
        userDocuments[_user].push(Document({
            hash: _documentHash,
            isValid: true
        }));
        emit DocumentAdded(_user, _documentHash);
    }

    function verifyDocument(address _user, string memory _documentHash) external view returns (bool) {
        for (uint256 i = 0; i < userDocuments[_user].length; i++) {
            if (keccak256(abi.encodePacked(userDocuments[_user][i].hash)) == keccak256(abi.encodePacked(_documentHash)) && userDocuments[_user][i].isValid) {
                return true;
            }
        }
        return false;
    }

    function setDocumentValidity(address _user, string memory _documentHash, bool _isValid) external onlyOwner {
        for (uint256 i = 0; i < userDocuments[_user].length; i++) {
            if (keccak256(abi.encodePacked(userDocuments[_user][i].hash)) == keccak256(abi.encodePacked(_documentHash))) {
                userDocuments[_user][i].isValid = _isValid;
                emit DocumentVerified(_user, _documentHash, _isValid);
                break;
            }
        }
    }
    function setEmployeeTenure(address _user, uint256 _startDate, uint256 _endDate) external onlyOwner {
        employeeTenures[_user].startDate = _startDate;
        employeeTenures[_user].endDate = _endDate;
        emit EmployeeTenureSet(_user, _startDate, _endDate);
    }

    function getEmployeeTenure(address _user) external view returns (uint256, uint256) {
        return (employeeTenures[_user].startDate, employeeTenures[_user].endDate);
    }

}
