<template>
  <b-message v-if="!ethereum" type="is-warning" title="No wallet found" :closable="false">
    Please install MetaMask or another Ethereum compatible wallet.
  </b-message>
  <b-message
    v-else-if="!supported_network && connected"
    type="is-warning"
    :title="`Not available`"
    :closable="false"
  >
    Please switch to Ropsten or Localhost Test Network.
  </b-message>
  <b-message
    v-else-if="firstCheck && ethereum && !connected"
    type="is-warning"
    title="Not connected"
    :closable="false"
  >
    Please check MetaMask, etc.
  </b-message>
</template>

<script>
export default {
  data() {
    return {
      supported_network: false,
      connected: false,
      firstCheck: false,
    }
  },
  computed: {
    ethereum: () => window.ethereum,
  },
  created() {
    setInterval(async () => {
      const network = await this.$store.state.web3.eth.net.getNetworkType();
      this.supported_network = network === "ropsten" || network === "private";
      const ret = await this.$store.state.web3.eth.getAccounts();
      this.connected = ret.length > 0;
      this.firstCheck = true;
    }, 1000);
  }
};
</script>
