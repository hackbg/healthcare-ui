<template>
  <div class="box">
    <!-- TODO: one line title and balance -->
    <div class="content">
      <h1 class="title h1-tag">{{ $t('labels.accountBalance') }}</h1><code>{{ accountBalance }}</code>
    </div>
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
