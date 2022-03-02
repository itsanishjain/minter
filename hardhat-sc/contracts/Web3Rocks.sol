// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    string _baseTokenURI;

    // total number of tokenIds minted
    uint256 public tokenIds;

    constructor(string memory baseURI) ERC721("CleverNFT", "CN") {
        _baseTokenURI = baseURI;
    }

    function mint() public {
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
}
