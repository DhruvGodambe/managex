//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';

contract PortfolioManager {
    address[] public portfolioTokens;
    uint public numberOfTokens;
    address public fundingToken;
    address public assetOwner;
    address public swapRouter = 0xE592427A0AEce92De3Edee1F18E0157C05861564;

    event TokenPurchased(address token, uint amount);

    modifier onlyOwner() {
        require(msg.sender == assetOwner, "Restricted to only asset owner!");
        _;
    }

    //["0xF94148A698D5D40D0413978F296bA473590382b9", "0x423cD2708d0601984e74AdBA7a3a8b2d29FD2B65", "0x74fBac39886f864b516817FE5A61bF4239296A61"], "0x29FeC84bED2D86A7d520F26275D61fc635Ab381e"
    constructor(address[] memory _portfolioTokens, address _fundingToken, address _assetOwner) {
        portfolioTokens = _portfolioTokens;
        numberOfTokens = _portfolioTokens.length;
        fundingToken = _fundingToken;
        assetOwner = _assetOwner;
    }

    function balancePortfolio() external {
        uint balance = IERC20(fundingToken).balanceOf(address(this));
        
        require(balance > 0, "Insufficient funding token balance");

        uint purchasePerToken = balance / numberOfTokens;

        for(uint i = 0; i < numberOfTokens; i++) {
            purchaseToken(portfolioTokens[i], purchasePerToken);
        }
    }

    function purchaseToken(address _token, uint _amount) public {
        TransferHelper.safeApprove(fundingToken, swapRouter, _amount);

        uint24 poolFee = 3000;

        // uniswap v3 exactInputSwap fx
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: fundingToken,
                tokenOut: _token,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp + 50,
                amountIn: _amount,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        uint amountOut = ISwapRouter(swapRouter).exactInputSingle(params);

        // on success
        emit TokenPurchased(_token, amountOut);
    }

    function withdrawAll() external onlyOwner {
        for(uint i = 0; i < numberOfTokens; i++) {
            uint fullBalance = IERC20(fundingToken).balanceOf(address(this));
            TransferHelper.safeTransfer(portfolioTokens[i], assetOwner, fullBalance);
        }
    }

    function withdrawAsset(address _token, uint _amount) external onlyOwner {
        TransferHelper.safeTransfer(_token, assetOwner, _amount);
    }
}