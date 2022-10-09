// import
// main funciton
// calling of main function

// function deployFunc() {
//   console.log("Hi!")
// }

// module.exports.default = deployFunc

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
//     // equivalent to hre.getNamedAccounts, hre.deployments
// }

// const helperConfig = require("../helper-hard-config")
// const networkConfig = helperConfig.networkConfig

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network, getNamedAccounts } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // if chainId is X use address Y
    // if chainId is Z use address A

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // Mock Contracts: If the contract dcoesn't exist, we deploy a minimal version of it for our local testing

    // what happens when we want to chain chains
    // when going for localhost or hardhart network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args:
            /* address */
            args,
        // put price feed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        // verify
        await verify(fundMe.address, args)
    }

    log("______________________________________________")
}

module.exports.tags = ["all", "fundme"]
