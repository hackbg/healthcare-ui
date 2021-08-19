<template>
  <div class="locale-changer">
    <b-button class="language-button" @click="switchLang('en')">
      🇬🇧
    </b-button>
    <b-button class="language-button" @click="switchLang('bg')">
      🇧🇬
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return { langs: ['en', 'bg'] };
  },
  methods: {
    switchLang(language) {
      this.$i18n.locale = language;
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-changer {
  top: 0;
  text-align: right;

  .language-button {
    background: none;
    border: none;
    font-size: 24pt;
    padding: 0;
    height: 24pt;
    margin-left: 2px;
    margin-right: 2px;
  }
}
</style>
