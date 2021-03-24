<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.welcome.title') }}
    </div>
      {{ $t('text.welcome.content') }}
    <row :gutter="12">
      <column :xs="12" :md="4" :lg="3">
        <div class="sign-in" @click="setPatient()">
          {{ $t('text.welcome.patient') }}
        </div>
      </column>
      <column :xs="12" :md="4" :lg="3">
        <div class="sign-in" @click="setDoctor()">
          {{ $t('text.welcome.doctor') }}
        </div>
      </column>
      <column :xs="12" :md="4" :lg="3">
        <div class="sign-in" @click="setPharmacie()">
          {{ $t('text.welcome.pharmacie') }}
        </div>
      </column>
      <column :xs="12" :md="4" :lg="3">
        <div class="sign-in" @click="setInsurer()">
          {{ $t('text.welcome.insurer') }}
        </div>
      </column>
    </row>
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
      localStorage.userType = "patient";
      this.$router.push('/home');
    },
    setDoctor() {
      localStorage.userType = "doctor";
      this.$router.push('/home');
    },
    setPharmacie() {
      localStorage.userType = "pharmacie";
      this.$router.push('/home');
    },
    setInsurer() {
      localStorage.userType = "insurer";
      this.$router.push('/home');
    },
  }
}

</script>