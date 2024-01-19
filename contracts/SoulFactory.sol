// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./Soul.sol";

contract SoulFactory {
    // Soul[] public souls;
    mapping(string => Soul) public souls;

    constructor() {}

    function createSoul(string memory _stageName) public {
        if (address(souls[_stageName]) != address(0)) {
            revert("Soul already exists");
        }

        Soul soul = new Soul(_stageName);
        souls[_stageName] = soul;
    }

    function getSoulByStageName(string memory _stageName) public view returns(Soul) {
        return souls[_stageName];
    }
}