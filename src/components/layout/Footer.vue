<template>
  <footer class="footer section__footer">
    <div class="footer__content">
      <div class="footer__left">
        <span>{{ $t('labels.copyright') }}</span>
      </div>
      <div class="footer__center">
        <a href="https://hack.bg"><img class="footer__logo" src="@/assets/img/hack-logo.png"/></a>
      </div>
      <div class="footer__right">
        <span>{{ $t('labels.mitlicense') }}</span>
        <a
          href="https://github.com"
          target="_blank"
          class="nav__link"
        >
        <img class="footer__icon" src="@/assets/img/github-logo.png"/>
      </a>
      </div>
    </div>
  </footer>
</template>

<script>
import '@/assets/scss/footer.scss';

export default {
  name: 'Footer'
};
</script>

