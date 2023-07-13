import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const NAME_1 = "Token1";
const SYMBOL_1 = "MTF";
const NAME_2 = "Token2";
const SYMBOL_2 = "MTS";

const FORKED_NETWORK_URL = 'http://localhost:8545';

describe('AddLiquidity', function () {
    let uniswapFactory : any;
    const routerAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    const factoryAddress = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
    let contract  : any;

    let owner: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress, users: SignerWithAddress[];

    let Token1;
    let token1: Contract;
    let token2: Contract;

    beforeEach(async () => {
        uniswapFactory = await ethers.getContractAt('IUniswapV2Factory', factoryAddress);

        const AddLiquidity = await ethers.getContractFactory('AddLiquidity');
        contract = await AddLiquidity.deploy(routerAddress, factoryAddress);
        await contract.deployed();

        Token1 = await ethers.getContractFactory('MyToken');
        token1 = await Token1.deploy(NAME_1, SYMBOL_1);
        await token1.deployed();
        token2 = await Token1.deploy(NAME_2, SYMBOL_2);
        await token2.deployed();
    });

    it('should add liquidity', async function () {
        const amountA = ethers.utils.parseEther('0.02');
        const amountB = ethers.utils.parseEther('0.05');

        await token1.approve(contract.address, amountA);
        await token2.approve(contract.address, amountB);

        try {
            const contractResult = await contract.addLiquidity(token1.address, token2.address, amountA, amountB);
            await contractResult.wait();
          } catch (error: any) {
            console.log('Error:', error.message);
          }
        const lpPair = await uniswapFactory.getPair(token1.address, token2.address);
        expect(lpPair).not.equal("0x0000000000000000000000000000000000000000");
    });
});
