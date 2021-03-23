<template>
  <!-- <div class="main-container" :style="{backgroundImage: `url(${backgroundTransaction})`}"> -->
    <div class="main-container">
    <div class="nf not-found-text">OOPS, PAGE NOT FOUND.</div>
    <div class="nf not-found">404</div>
  </div>
</template>

<script>
import '../assets/css/not_found.css';
import '../assets/css/app.css';
// import backgroundTransaction from "../assets/img/background.jpg";

export default {
  name: 'NotFound',
  props: {
    msg: String
  }
//   data: function() {
//     return {
//       backgroundTransaction,
//     }
//   }
}

</script>