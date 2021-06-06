import EtherService from "../service/ethService.js";

export default class EtherController {
  constructor() {
    return (async () => {
      const ethService = await new EtherService();
      this.ethService = ethService;
      return this;
    })();
  }

  async sendEth (recipient, value) {
    const tx = await this.ethService.sendTransaction({ to: recipient, value });
  }

  validateEthAddress (address) {
    return this.ethService.validateEthAddress(address);
  }

}
