<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.welcome.title1') }}
      <a href="https://hack.bg">
        <img class="welcome-logo" src="@/assets/img/hack-logo.png"/>
      </a>
      {{ $t('text.welcome.title2') }}
    </div>
      {{ $t('text.welcome.content') }}
    <div class="welcome-grid">
      <row :gutter="12">
        <column :xs="12" :md="3" :lg="3">
          <div class="sign-in" @click="setPatient()">
            {{ $t('text.welcome.patient') }}
          </div>
        </column>
        <column :xs="12" :md="3" :lg="3">
          <div class="sign-in" @click="setDoctor()">
            {{ $t('text.welcome.doctor') }}
          </div>
        </column>
        <column :xs="12" :md="3" :lg="3">
          <div class="sign-in" @click="setPharmacy()">
            {{ $t('text.welcome.pharmacy') }}
          </div>
        </column>
        <column :xs="12" :md="3" :lg="3">
          <div class="sign-in" @click="setInsurer()">
            {{ $t('text.welcome.insurer') }}
          </div>
        </column>
      </row>
    </div>
  </div>
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
  methods: {
    setPatient() {
      this.$store.commit('userType', 'patient');
      this.$router.push('/home');
    },
    setDoctor() {
      // localStorage.userType = "doctor";
      this.$store.commit('userType', 'doctor');
      this.$router.push('/home');
    },
    setPharmacy() {
      // localStorage.userType = "pharmacy";
      this.$store.commit('userType', 'pharmacy');
      this.$router.push('/home');
    },
    setInsurer() {
      // localStorage.userType = "insurer";
      this.$store.commit('userType', 'insurer');
      this.$router.push('/home');
    },
  }
}

</script>