<template>
  <div class="box">
    <!-- TODO: one line title and balance -->
    <div class="is-flex is-justify-content-space-between">
      <h1 class="title h1-tag">{{ $t('labels.accountBalance') }}</h1>
      <code class="account-balance">{{ accountBalance }}</code>
    </div>
  </div>
</template>

<script>
import InsuranceABI from '../web3/insuranceABI';

export default {
  name: 'InsuranceDoctor',
  props: {
    msg: String,
  },
  data() {
    return {
      accountBalance: '',
    };
  },
  async created() {
    const balance = await InsuranceABI.getContract()
      .methods.balanceOf(this.$store.state.web3.currentProvider.selectedAddress)
      .call();
    this.accountBalance = await this.$store.state.web3.utils.fromWei(balance);
  },
};
</script>

<style scoped>
  .account-balance {
    height: 1.8rem;
    margin-top: 0.625rem;
  }
</style>