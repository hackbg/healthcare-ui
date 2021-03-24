<template>
  <div class="main-container" style="text-align: center">
    <div class="sign-in" @click="setPatient()">
      Patient
    </div>
    <div class="sign-in">
      Doctor
    </div>
    <div class="sign-in">
      Pharmacie
    </div>
    <div class="sign-in">
      Insurer
    </div>
  </div>
</template>

<script>
import '../assets/css/welcome.css';

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