<template>
  <footer class="footer section__footer">
    <div class="footer__content">
      <div class="footer__left">
        <span>Copyright &copy; 2021</span>
      </div>
      <div class="footer__center">
        <a href="https://hack.bg"><img class="footer__logo" src="@/assets/img/hack-logo.png"/></a>
      </div>
      <div class="footer__right">
        <span>Created under the MIT License</span>
        <a
          href="https://github.com"
          target="_blank"
          class="nav__link"
        >
        <img class="footer__icon" src="@/assets/img/github-logo.png"/>
        <!-- <ion-icon name="logo-github" class="footer__icon"></ion-icon> -->
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

