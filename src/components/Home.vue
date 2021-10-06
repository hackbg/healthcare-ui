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
    <!-- <div class="title">
      {{ $t('text.home.title') }}
    </div> -->

    <!-- <b-carousel interval="9000" pause-hover="true">
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section :class="`hero is-medium is-${carousel.color}`">
          <div class="hero-body has-text-centered">
            <h1 class="title">{{carousel.text}}</h1>
          </div>
        </section>
      </b-carousel-item>
    </b-carousel> -->
    <img src="@/assets/img/healthcare.png" />

    <!-- <div class="home-content">
      <div class="first-hm">
        <span v-html="$t('text.home.content')"></span>
      </div>
    </div> -->
  </div>
</template>

<script>
import '../assets/css/home.css';
import WalletConnect from './WalletConnect.vue';
import createWeb3 from '../web3/web3';

export default {
  components: {WalletConnect},
  name: 'Home',
  props: {},
  mounted() {
    createWeb3();
  },
  // data() {
  //   return {
  //     carousels: [
  //       { text: 'Doctors can make prescriptions.', color: 'primary' },
  //       { text: 'Patients can receive online prescription with up to 18 medicines in it.', color: 'success' },
  //       { text: 'Pharmacies can check for online prescription and sell the prescribed medicines.', color: 'warning' },
  //       { text: 'The goal is to avoid medicines fraud.', color: 'danger' },
  //       { text: `The doctor can't prescribe medicines for which doesn't have right. For example not legal or too expensive.`, color: 'primary' },
  //       { text: `Fraudsters can't falsify prescriptons. For examle fake prescriptions with free medicines and sell them after.`, color: 'warning' },
  //       { text: `Patients can't rewrite prescriptions.`, color: 'primary' },
  //       { text: `Pharmacies can't lie to the government that they have given more free and reduced medicines than they really did.`, color: 'success' },
  //     ]
  //   }
  // }
};
</script>
