<template>
  <div class="main-container content">
    <div class="title">
      Account balance:
    </div>
    <div>{{ accountBalance }}</div>
  </div>
</template>

<script>
import web3 from "../web3/web3";
import InsuranceABI from '../web3/insuranceABI';

export default {
  name: 'InsuranceDoctor',
  props: {
    msg: String,
  },
  data() {
    return {
      accountBalance: ''
    };
  },
  async created() {
    const balance = await InsuranceABI.getContract().methods.balanceOf(window.web3.currentProvider.selectedAddress).call();
    this.accountBalance =  await web3.utils.fromWei(balance);
  }
};

</script>
