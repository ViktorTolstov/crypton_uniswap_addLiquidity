# Uniswap AddLiqudity Contract

## ContractAddress
0x5001412906590F1Df2b64391721983dC49338615

## Network
goerli

## Installation
Clone the repository using the following command:
Install the dependencies using the following command:
```
npm i
```

## Deployment

Fill in all the required environment variables(copy .env-example to .env and fill it). 

Deploy contract to the chain (goerli testnet):
```
npx hardhat run scripts/deployUniswap.ts --network goerli
```

## Tasks
Create new task(s) ans save it(them) in the folder "tasks". Add a new task name in the file "tasks/index.ts".

Running a task:
```
npx hardhat addLiquidity --contract 0x5001412906590F1Df2b64391721983dC49338615 --token1 0x66388D9361aB6c56E59bdD5d9C27504D26887278 --token2 0xB3cd6e0B74dBE7CB14585d35c86dc791aA1295aC --amount1 1000000000000000 --amount2 2000000000000000 --network goerli
```
Note: Replace {USER_ADDRESS} with the address of the wallet and  {TOKEN_ADDRESS} with the address of the token.

## Verification
Verify the installation by running the following command:
```
npx hardhat verify --network goerli 0x5001412906590F1Df2b64391721983dC49338615 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
```
Note: Replace {TOKEN_ADDRESS} with the address of the token, "MyToken" with the name of the token and "MTK" with the symbol of the token.

## Tests
Fork mainnet to localhost to get factory and router in local network:
```
npx hardhat node --fork https://mainnet.infura.io/v3/{key}
```

Run tests: 
```
npx hardhat test --network localhost
```
