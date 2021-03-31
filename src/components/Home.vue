<template>
  <div class="main-container home-container">
    <div class="title">
      {{ $t('text.home.title') }}
    </div>
    <div class="home-content">
      <span v-html="$t('text.home.content')"></span>
    </div>
  </div>
</template>

<script>
import '../assets/css/home.css';

export default {
  name: 'Home',
  props: {
    msg: String,
  },
};
</script>
