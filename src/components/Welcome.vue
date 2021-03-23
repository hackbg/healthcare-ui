<template>
  <div class="main-container" style="text-align: center">
    <div class="sign-in">
      Patient
    </div>
    <div class="sign-in">
      Doctor
    </div>
    <div class="sign-in">
      Pharmacie
    </div>
  </div>
</template>

<script>
import '../assets/css/welcome.css';

export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}

</script>