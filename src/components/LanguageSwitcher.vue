<template>
  <b-dropdown aria-role="list" v-model="selectedLang">
    <template v-if="selectedLang === 'bg'" #trigger>
      <b-button
        inverted
        size="is-primary"
      >
        <!-- 🇧🇬 -->
        BG
      </b-button>
    </template>
    <template v-else-if="selectedLang === 'en'" #trigger>
      <b-button
        inverted
        size="is-primary"
      >
        <!-- 🇬🇧 -->
        EN
      </b-button>
    </template>

      <b-dropdown-item aria-role="listitem" @click="switchLang('en')" value="en" >
        <div class="media">
          <!-- <b-icon class="media-left" icon="earth"></b-icon> -->
          <!-- <div>🇬🇧</div> -->
          EN
          <div class="media-content lang-item">
            <h3>English</h3>
          </div>
        </div>
      </b-dropdown-item>

      <b-dropdown-item aria-role="listitem" @click="switchLang('bg')" value="bg" >
        <div class="media">
          <!-- <b-icon class="media-left" icon="account-multiple"></b-icon> -->
          <!-- <div>🇧🇬</div> -->
          BG
          <div class="media-content lang-item">
            <h3>Bulgarian</h3>
          </div>
        </div>
      </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return {
      selectedLang: 'en',
      langs: ['en', 'bg']
    };
  },
  methods: {
    switchLang(language) {
      this.$i18n.locale = language;
    },
  },
};
</script>

<style scoped>
  .lang-item {
    margin-left: 10px;
  }

  button {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
</style>
