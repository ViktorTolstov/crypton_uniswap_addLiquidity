import { ethers, run } from 'hardhat';

async function main() {
  const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

  const AddLiquidity = await ethers.getContractFactory('AddLiquidity');
  const addLiquidity = await AddLiquidity.deploy(routerAddress, factoryAddress);

  await addLiquidity.deployed();

  console.log(`AddLiquidity contract deployed to ${addLiquidity.address}`);

  try {
    await run('verify:verify', {
      address: addLiquidity.address,
      contract: 'contracts/AddLiquidity.sol:AddLiquidity',
      constructorArguments: [routerAddress, factoryAddress],
    });
    console.log('Contract verification successful');
  } catch (error) {
    console.log('Contract verification failed:', error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
