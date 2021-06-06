import WalletService from "../service/WalletService.js";

export default class EtherController {
  constructor() {
    return (async () => {
      const walletService = await new WalletService();
      this.walletService = walletService;
      return this;
    })();
  }

  async calculateFee (amount) {
    const fee = await this.walletService.calculateFee(amount);
    return fee
  }

  validateAmount (amount, fees, totalBalance) {
    return this.walletService.validateAmount(amount, fees, totalBalance);
  }

  async getEthUsdPrice () {
    const price = await this.walletService.getEthUsdPrice();
    return price;
  }

}
