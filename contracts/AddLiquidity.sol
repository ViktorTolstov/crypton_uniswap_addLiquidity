// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';



contract AddLiquidity {
    event AddedLiquidity(address indexed tokenA, address indexed tokenB, address indexed creator, address lpPair);
    event FallbackCalled(address sender, uint256 value);

    IUniswapV2Router02 public router;
    IUniswapV2Factory public factory;

    constructor(address _router, address _factory) {
        router = IUniswapV2Router02(_router);
        factory = IUniswapV2Factory(_factory);
    }
    
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB
    ) external {
        require(amountA > 0, "AmountA must be greater than 0");
        require(amountB > 0, "AmountB must be greater than 0");

        address lpPair = factory.getPair(tokenA, tokenB);
        if (lpPair == address(0)) {
            lpPair = factory.createPair(tokenA, tokenB);
        }
        require(lpPair != address(0), "Pair creation failed");

        IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), amountB);

        IERC20(tokenA).approve(address(router), amountA);
        IERC20(tokenB).approve(address(router), amountB);

        (uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin) =
            (amountA, amountB, 0, 0);

        router.addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            msg.sender,
            block.timestamp
        );

        emit AddedLiquidity(tokenA, tokenB, msg.sender, lpPair);
    }
}
