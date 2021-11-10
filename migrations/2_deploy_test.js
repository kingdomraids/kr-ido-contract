const {
    BigNumber
} = require("@ethersproject/bignumber");
const MockToken = artifacts.require("MockToken");
const IDO = artifacts.require("IDO");
const Web3 = require('web3');

// time should be changed before running migration
const START_SALE_AT = 1636573500;
const END_SALE_AT = 1636573800;
const START_GRACE_AT = 1636573800;
const END_GRACE_AT = 1636574100;
const START_REDEEM_AT = 1636574100;
const END_REDEEM_AT = 1636574400;
const TOTAL_SUPPLY = 1000000;
const MIN_DEPOSIT = 50;

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployContracts(deployer, network, accounts)])
}

module.exports = migration;

async function deployContracts(deployer, network, accounts) {

    /**
     * Deploy MockToken
     */

    await deployer.deploy(MockToken, "Mock KRS", "KRS");
    let mockKRS = MockToken.address;

    await deployer.deploy(MockToken, "Mock USDT", "USDT");
    let mockUSDT = MockToken.address;

    await deployer.deploy(
        IDO,
        mockKRS,
        mockUSDT,
        START_SALE_AT,
        END_SALE_AT,
        START_GRACE_AT,
        END_GRACE_AT,
        START_REDEEM_AT,
        END_REDEEM_AT,
        Web3.utils.toWei(TOTAL_SUPPLY.toString(), 'ether'),
        Web3.utils.toWei(MIN_DEPOSIT.toString(), 'ether'),
    );

    console.table({
        KRS: mockKRS,
        USDT: mockUSDT,
        IDO: IDO.address
    });
}