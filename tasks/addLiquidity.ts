import { task } from 'hardhat/config';
import { BigNumber, ContractTransaction, ContractReceipt } from 'ethers';

task('addLiquidity', 'Add liquidity to the contract')
  .addParam('contract', 'Address of addLiquidity contract')
  .addParam('token1', 'Address of token A')
  .addParam('token2', 'Address of token B')
  .addParam('amount1', 'Amount of token A')
  .addParam('amount2', 'Amount of token B')
  .setAction(async ({contract, token1, token2, amount1, amount2 }, { ethers }) => {
    const addLiquidity = await ethers.getContractAt('AddLiquidity', contract);

    const Token = await ethers.getContractFactory('MyToken');
    const tokenContract1 = Token.attach(token1);
    const tokenContract2 = Token.attach(token2);

    await tokenContract1.approve(contract, amount1);
    await tokenContract2.approve(contract, amount2);
    let contractResult = await addLiquidity.addLiquidity(token1, token2, amount1, amount2);

    const contractReceipt: ContractReceipt = await contractResult.wait();
    const event = contractReceipt.events?.find(event => event.event === 'AddedLiquidity');

    console.log('Liquidity added successfully');
    console.log(`Args: ${event?.args}`);
  });
