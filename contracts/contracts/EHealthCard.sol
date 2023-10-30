// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

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
    }

    Card[] healthCards;
    uint256 public length = 0;

    Card private dummy =
        Card(
            "dummy",
            "dummy",
            0x20cb94e4E6b287B9F9A4af6C1B2356468bA35bE3,
            "dummy",
            "dummy",
            "dummy",
            "dummy"
        );

    function getHealhCardByAddress(
        address _address
    ) public view returns (Card memory) {
        require(healthCards.length > 0);
        for (uint i = 0; i < length; i++) {
            if (healthCards[i].walletAddress == _address) {
                return healthCards[i];
            } else {
                return dummy;
            }
        }
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
            IdNumber: _IdNumber
        });

        uint256 tokenId = length;
        length++;
        healthCards.push(newCard);

        _mint(_walletAddress, tokenId);
    }

    function getStorageLink(
        string memory _id
    ) public view returns (string memory) {
        for (uint i = 0; i < length; i++) {
            if (
                keccak256(abi.encodePacked(healthCards[i].id)) ==
                keccak256(abi.encodePacked(_id))
            ) {
                return healthCards[i].link;
            }
        }
        return "invalid id";
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
