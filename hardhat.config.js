require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-solhint")
require("hardhat-deploy")
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")
require("@nomiclabs/hardhat-etherscan")

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/", //accounts: hardhats already placed it,
            chainId: 31337,
        },
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
    // solidity: "0.8.17",
    solidity: {
        compilers: [
            { version: "0.8.8" },
            { version: "0.6.6" },
            { version: "0.8.10" },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
        user: {
            default: 1,
        },
    },
    mocha: {
        timeout: 500000,
    },
}
