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
        string id;
        string link;
        address walletAddress;
        string dateOfBirth;
        string gender;
        string bloodType;
        string IdNumber;
        address[3] contacts;
    }

    Card[] healthCards;
    mapping(address => Card) userHCards;
    mapping(string => address) userAddressIDNumber;
    uint256 public length = 0;

    Card private dummy =
        Card(
            "dummy",
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
    ) public view returns (Card memory) {
        require(healthCards.length > 0);
        require(
            keccak256(abi.encodePacked(userHCards[_address].link)) !=
                keccak256(abi.encodePacked("")),
            "User has no health card"
        );

        return userHCards[_address];
    }

    function mintHealthCard(
        string memory _id,
        string memory _link,
        address _walletAddress,
        string memory _dateOfBirth,
        string memory _gender,
        string memory _bloodType,
        string memory _IdNumber
    ) public onlyOwner {
        Card memory newCard = Card({
            id: _id,
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
    }

    function getStorageLink(
        string memory _id
    ) public view returns (string memory) {
        address userAddress = userAddressIDNumber[_id];
        if (userAddress == address(0)) {
            return "user is not registered";
        } else {
            return getHealhCardByAddress(userAddress).link;
        }
    }

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
    ) public returns (address[3] memory contacts) {
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

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
