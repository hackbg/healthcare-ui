<template>
  <form ref="form" class="modal-form">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span v-html="$t('labels.navbar.signin')"></span>
        </p>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <span v-html="$t('text.welcome.content')"></span>
        <div class="welcome-container">
          <div class="first-wl wl" @click="setPatient()">
            {{ $t('text.welcome.patient') }}
          </div>
          <div class="second-wl wl" @click="setDoctor()">
            {{ $t('text.welcome.doctor') }}
          </div>
          <div class="third-wl wl" @click="setPharmacy()">
            {{ $t('text.welcome.pharmacy') }}
          </div>
          <div class="fourt-wl wl" @click="setInsurer()">
            {{ $t('text.welcome.insurer') }}
          </div>
        </div>
      </section>
      <footer class="modal-card-foot" style="font-style:oblique">
        <span v-html="$t('text.welcome.note')"></span>
      </footer>
    </div>

    <!-- <div class="title">
      {{ $t('text.welcome.title1') }}
      <a href="https://hack.bg">
        <img class="welcome-logo" src="@/assets/img/hack-logo.png"/>
      </a>
      {{ $t('text.welcome.title2') }}
    </div> -->
  </form>
</template>

<script>
import Vue from 'vue';
import { Row, Column } from 'vue-grid-responsive';
import '../assets/css/welcome.css';

Vue.component('row', Row);
Vue.component('column', Column);

export default {
  name: 'Welcome',
  props: {
    msg: String
  },
  data() {
    return {
      btnClose: this.$i18n.t('buttons.close'),
    }
  },
  methods: {
    setPatient() {
      this.$store.commit('userType', 'patient');
      if(this.$route.path !== '/')
        this.$router.push('/');
      this.$emit('close');
    },
    setDoctor() {
      // localStorage.userType = "doctor";
      this.$store.commit('userType', 'doctor');
      if(this.$route.path !== '/')
        this.$router.push('/');
      this.$emit('close');
    },
    setPharmacy() {
      // localStorage.userType = "pharmacy";
      this.$store.commit('userType', 'pharmacy');
      if(this.$route.path !== '/')
        this.$router.push('/');
      this.$emit('close');
    },
    setInsurer() {
      // localStorage.userType = "insurer";
      this.$store.commit('userType', 'insurer');
      if(this.$route.path !== '/')
        this.$router.push('/');
      this.$emit('close');
    },
  }
}

</script>
