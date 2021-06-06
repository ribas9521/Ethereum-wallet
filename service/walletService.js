import EtherService from "./ethService.js"
import { ethers } from "../node_modules/ethers/dist/ethers.esm.js"
import { FEE_FACTOR } from "../constants.js"

export default class WalletService {
  constructor() {
    return (async () => {
      const ethService = await new EtherService();
      this.ethService = ethService;
      return this;
    })();
  }

  async calculateFee (amount) {
    if (!amount) return;
    const percentage = (1 + this.getGasPercentage(ethers.utils.parseEther(amount)));
    const gas = Math.ceil(FEE_FACTOR * amount * percentage / 100)
    const gasPrice = await this.ethService.getGasPrice();
    const fees = gasPrice.mul(gas);
    return ({ wei: fees, ether: ethers.utils.formatEther(fees) });
  }

  getGasPercentage (amountInWei) {
    if (amountInWei.gte(ethers.utils.parseEther("0")) && amountInWei.lt(ethers.utils.parseEther("0.01")))
      return 0.5;
    else if (amountInWei.gte(ethers.utils.parseEther("0.01")) && amountInWei.lt(ethers.utils.parseEther("0.25")))
      return 0.7;
    else if (amountInWei.gte(ethers.utils.parseEther("0.25")) && amountInWei.lt(ethers.utils.parseEther("5")))
      return 1;
    else if (amountInWei.gte(ethers.utils.parseEther("5")) && amountInWei.lt(ethers.utils.parseEther("30")))
      return 1.5;
    else if (amountInWei.gte(ethers.utils.parseEther("30")) && amountInWei.lt(ethers.utils.parseEther("150")))
      return 2;
    else if (amountInWei.gte(ethers.utils.parseEther("150")))
      return 3;
  }

  validateAmount (amount, fees, totalBalance) {
    const amountInWei = ethers.utils.parseEther(amount);
    const totalBalanceInWei = ethers.utils.parseEther(totalBalance);
    return (amountInWei.add(fees).lt(totalBalanceInWei))
  }

  async getEthUsdPrice () {
    const data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
    const resp = await data.json();
    return parseFloat(parseFloat(resp.ethereum.usd));
  }
}
