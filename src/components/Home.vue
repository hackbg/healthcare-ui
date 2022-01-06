<template>
  <div class="main-container home-container">
    <wallet-connect />
    <div class="title">
      {{ $t('text.welcome.title1') }}
      <a href="https://hack.bg">
        <img class="welcome-logo" src="@/assets/img/hack-logo.png" />
      </a>
      {{ $t('text.welcome.title2') }}
    </div>
    <img src="@/assets/img/healthcare.png" />
  </div>
</template>

<script>
import '../assets/scss/home.scss';
import WalletConnect from './WalletConnect.vue';
import createWeb3 from '../web3/web3';

export default {
  components: { WalletConnect },
  name: 'Home',
  props: {},
  mounted() {
    createWeb3();
  },
};
</script>
