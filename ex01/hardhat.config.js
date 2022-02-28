require('@nomiclabs/hardhat-waffle')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners()

	for (const account of accounts) {
		console.log(account.address)
	}
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: '0.8.12',
	paths: {
		artifacts: './src/artifacts',
	},
	networks: {
		hardhat: {
			chainId: 1337,
		},
		ropsten: {
			// find this URL below in the endpoint section of the infura.io dashboard
			url: 'https://mainnet.infura.io/v3/c2a0b32302b746df9eb3b8e3523bef32',
			// find this private key in your metamask account
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
	},
}
