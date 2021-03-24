<template>
  <div class="main-container content">
    <div class="title">
      {{ $t('text.home.title') }}
    </div>
    <span v-html="$t('text.home.content')"></span>
  </div>
</template>

<script>
import '../assets/css/home.css';

export default {
  name: 'Home',
  props: {
    msg: String
  }
}

</script>