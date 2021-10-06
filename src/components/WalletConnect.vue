<template>
  <b-message v-if="!ethereum" type="is-warning" title="No wallet found" :closable="false">
    Please install MetaMask or another Ethereum compatible wallet.
  </b-message>
  <b-message
    v-else-if="!ropsten && connected"
    type="is-warning"
    :title="`Not available`"
    :closable="false"
  >
    Please switch to Ropsten Test Network.
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
      ropsten: false,
      connected: false,
      firstCheck: false
    }
  },
  computed: {
    ethereum: () => window.ethereum,
  },
  created() {
    setInterval(async () => {
      this.ropsten = await this.$store.state.web3.eth.net.getNetworkType() === "ropsten";
      this.connected = await this.$store.state.web3.eth.net.isListening();
      this.firstCheck = true;
    }, 1000);
  }
};
</script>
