import { ethers } from "../node_modules/ethers/dist/ethers.esm.js"

export default class EthService {
  constructor() {
    return (async () => {
      await this.connect();
      return this;
    })();
  }

  async connect () {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    this.signer = signer
    this.provider = provider
  }

  async sendTransaction ({ to, value }) {
    try {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(value.toString())
      });
      return tx;
    }
    catch (e) {
      console.log(e);
    }
  }

  async getGasPrice () {
    try {
      const gasPrice = await this.provider.getGasPrice();
      return gasPrice;
    } catch (e) {
      console.log(e);
    }
  }

  validateEthAddress (address) {
    try {
      ethers.utils.getAddress(address);
      return true;
    }
    catch (e) {
      return false;
    }
  }
}
