// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract HealthCard is ERC721 {
    address private owner;

    constructor(address _owner) ERC721("EHealthCard", "EHC") {
        owner = _owner;
    }

    struct Card {
        uint256 id;
        string link;
        address walletAddress;
        string dateOfBirth;
        string gender;
        string bloodType;
        string IdNumber;
        address[3] contacts;
    }

    struct customCard {
        string id;
        address walletAddress;
        string dateOfBirth;
        string gender;
        string bloodType;
        string IdNumber;
        address[3] contacts;
    }

    enum AccessStatus {
        None,
        Pending,
        Approved,
        Rejected
    }

    struct AccessRequest {
        address hpprovider;
        address patient;
        AccessStatus status;
        uint256 expiryTime;
    }

    Card[] healthCards;
    AccessRequest[] accessRequestsArray;
    mapping(address => Card) userHCards;
    mapping(string => address) userAddressIDNumber;
    mapping(address => mapping(address => AccessRequest)) public accessRequests;
    uint256 public length = 1;

    Card private dummy =
        Card(
            0,
            "dummy",
            0x20cb94e4E6b287B9F9A4af6C1B2356468bA35bE3,
            "dummy",
            "dummy",
            "dummy",
            "dummy",
            [address(0), address(0), address(0)]
        );

    function getHealhCardByAddress(
        address _address
    ) private view returns (Card memory) {
        require(healthCards.length > 0);
        require(
            keccak256(abi.encodePacked(userHCards[_address].link)) !=
                keccak256(abi.encodePacked("")),
            "User has no health card"
        );

        return userHCards[_address];
    }

    function mintHealthCard(
        string memory _link,
        address _walletAddress,
        string memory _dateOfBirth,
        string memory _gender,
        string memory _bloodType,
        string memory _IdNumber
    ) public onlyOwner {
        Card memory newCard = Card({
            id: length,
            link: _link,
            walletAddress: _walletAddress,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            bloodType: _bloodType,
            IdNumber: _IdNumber,
            contacts: [address(0), address(0), address(0)]
        });

        uint256 tokenId = length;
        length++;
        healthCards.push(newCard);
        userHCards[_walletAddress] = newCard;
        userAddressIDNumber[_IdNumber] = _walletAddress;

        _mint(_walletAddress, tokenId);
        length++;
    }

    function getStorageLinkPatient(
        string memory _id
    ) public view returns (string memory) {
        address userAddress = userAddressIDNumber[_id];
        if (userAddress == address(0)) {
            return "user is not registered";
        } else if (msg.sender != userAddress) {
            return "records only accessible by the patient";
        } else {
            return getHealhCardByAddress(userAddress).link;
        }
    }

    // function getStorageLinkPatient() public view returns (string memory) {
    //     if (msg.sender == address(0)) {
    //         return "user is not registered";
    //     } else {
    //         return getHealhCardByAddress(msg.sender).link;
    //     }
    // }

    function setEmergencyContacts(
        address _address,
        address[3] memory econtacts
    ) public onlyOwner {
        require(econtacts.length <= 3, "Too many emergency contacts");

        for (uint256 i = 0; i < econtacts.length; i++) {
            userHCards[_address].contacts[i] = econtacts[i];
        }
    }

    function getEmergencyContacts(
        string memory idNumber
    ) public view returns (address[3] memory contacts) {
        address userAddress = userAddressIDNumber[idNumber];
        Card memory userCard = getHealhCardByAddress(userAddress);
        if (
            keccak256(abi.encodePacked((userCard.link))) ==
            keccak256(abi.encodePacked(("dummy")))
        ) {
            address[3] memory dummy = [address(0), address(0), address(0)];
            return dummy;
        } else {
            return userCard.contacts;
        }
    }

    function getStorageLinkForHP(
        string memory _id
    ) public view returns (string memory) {
        address patient = userAddressIDNumber[_id];
        require(
            accessRequests[msg.sender][patient].status == AccessStatus.Approved,
            "Access not approved"
        );
        require(
            block.timestamp <= accessRequests[msg.sender][patient].expiryTime,
            "Access has expired"
        );
        address userAddress = userAddressIDNumber[_id];
        if (userAddress == address(0)) {
            return "user is not registered";
        } else {
            return getHealhCardByAddress(userAddress).link;
        }
    }

    function changeStorageLink(string memory _link) public {
        require(healthCards.length > 0, "there is no registered users");
        require(
            keccak256(abi.encodePacked(userHCards[msg.sender].link)) !=
                keccak256(abi.encodePacked("")),
            "User has no health card"
        );
        userHCards[msg.sender].link = _link;
    }

    function changeStorageLinkForHP(
        string memory _link,
        address patient
    ) public {
        require(healthCards.length > 0, "there is no registered users");
        require(
            keccak256(abi.encodePacked(userHCards[patient].link)) !=
                keccak256(abi.encodePacked("")),
            "User has no health card"
        );
        require(
            accessRequests[msg.sender][patient].status == AccessStatus.Approved,
            "Access not approved"
        );
        require(
            block.timestamp <= accessRequests[msg.sender][patient].expiryTime,
            "Access has expired"
        );
        userHCards[patient].link = _link;
    }

    function isRegistered(address userAddress) public view returns (bool) {
        if (userHCards[userAddress].walletAddress == address(0)) {
            return false;
        }
        return true;
    }

    event AccessRequested(address patient, address provider);
    event AccessApproved(address patient, address provider);
    event AccessRejected(address patient, address provider);

    modifier onlyPatient(address patient) {
        require(
            msg.sender == patient,
            "Only the patient can call this function"
        );
        require(
            userHCards[patient].walletAddress != address(0),
            "user is not a patient or doesnt have a medical card"
        );
        _;
    }

    // function requestAccess(string memory _id) external {
    //     address patient = userAddressIDNumber[_id];
    //     require(
    //         accessRequests[msg.sender][patient].status == AccessStatus.None,
    //         "Access request already exists"
    //     );

    //     accessRequests[msg.sender][patient] = AccessRequest({
    //         hpprovider: msg.sender,
    //         patient: patient,
    //         status: AccessStatus.Pending,
    //         expiryTime: 0
    //     });
    //     accessRequestsArray.push(
    //         AccessRequest({
    //             hpprovider: msg.sender,
    //             patient: patient,
    //             status: AccessStatus.Pending,
    //             expiryTime: 0
    //         })
    //     );
    //     emit AccessRequested(msg.sender, patient);
    // }

    function requestAccess(string memory _id) external {
        address patient = userAddressIDNumber[_id];
        require(
            accessRequests[msg.sender][patient].status == AccessStatus.None,
            "Access request already exists"
        );

        accessRequests[msg.sender][patient] = AccessRequest({
            hpprovider: msg.sender,
            patient: patient,
            status: AccessStatus.Pending,
            expiryTime: 0
        });
        accessRequestsArray.push(
            AccessRequest({
                hpprovider: msg.sender,
                patient: patient,
                status: AccessStatus.Pending,
                expiryTime: 0
            })
        );
        emit AccessRequested(msg.sender, patient);
    }

    function approveAccess(address hprovider, uint256 duration) external {
        require(
            accessRequests[hprovider][msg.sender].status ==
                AccessStatus.Pending,
            "No pending access request"
        );
        require(
            userHCards[msg.sender].walletAddress != address(0),
            "user has no medical records"
        );

        accessRequests[hprovider][msg.sender].status = AccessStatus.Approved;
        accessRequests[hprovider][msg.sender].expiryTime =
            block.timestamp +
            duration;

        emit AccessApproved(msg.sender, hprovider);
    }

    function rejectAccess(address hprovider) external onlyPatient(msg.sender) {
        require(
            accessRequests[hprovider][msg.sender].status ==
                AccessStatus.Pending,
            "No pending access request"
        );

        accessRequests[hprovider][msg.sender].status = AccessStatus.Rejected;

        emit AccessRejected(msg.sender, hprovider);
    }

    function getAccessRequests(
        address _patient
    ) external view returns (AccessRequest[] memory) {
        AccessRequest[] memory requests = new AccessRequest[](
            accessRequestsArray.length
        );
        uint count = 0;
        for (uint i = 0; i < accessRequestsArray.length; i++) {
            if (
                accessRequestsArray[i].patient == _patient &&
                accessRequestsArray[i].status == AccessStatus.Pending
            ) {
                requests[count] = accessRequestsArray[i];
                count++;
            }
        }
        return requests;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
