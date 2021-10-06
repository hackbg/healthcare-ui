<template>
  <div class="main-container">
    <div class="nf not-found-text">{{ $t('labels.pageNotFound') }}</div>
    <div class="nf not-found">404<br /></div>
  </div>
</template>

<script>
import '../assets/css/not_found.css';
import '../assets/css/app.css';

export default {
  name: 'NotFound',
  props: {
    msg: String,
  },
};
</script>
