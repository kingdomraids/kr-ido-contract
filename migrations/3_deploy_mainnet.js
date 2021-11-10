const {
    BigNumber
} = require("@ethersproject/bignumber");
const IDO = artifacts.require("IDO");
const Web3 = require('web3');

// time should be changed before running migration
const token = '0x253A3aA4C804543D372FDAe0e030Cf838338A50c'; // KRS
const currency = '0xDe7f206a3773aE52b12C5eCeabA658FAfAa03F15'; // USDT
const START_SALE_AT = 1636574400;
const END_SALE_AT = 1636574700;
const START_GRACE_AT = 1636574700;
const END_GRACE_AT = 1636575000;
const START_REDEEM_AT = 1636575000;
const END_REDEEM_AT = 1636575300;
const TOTAL_SUPPLY = 1000000;
const MIN_DEPOSIT = 50;

const migration = async (deployer, network, accounts) => {
    await Promise.all([deployContracts(deployer, network, accounts)])
}

module.exports = migration;

async function deployContracts(deployer, network, accounts) {

    await deployer.deploy(
        IDO,
        token,
        currency,
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
        IDO: IDO.address
    });
}