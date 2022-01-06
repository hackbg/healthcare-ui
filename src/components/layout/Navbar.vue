<template>
  <div>
    <header class="header">
      <b-navbar class="container is-max-desktop">
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{path: '/'}">
            <div>
              <b-icon icon="heartbeat" type="is-primary" />
              <h1 class="logo title is-6 has-text-primary">
                {{ $t('labels.navbar.healthcare') }}
              </h1>
            </div>
          </b-navbar-item>
        </template>
        <template slot="start">
          <b-navbar-item
            v-if="userType === 'patient' || userType === 'doctor' || userType === 'pharmacy'"
            tag="router-link"
            to="/prescriptions"
            class="has-text-primary"
          >
            <div class="navbar-item-text">
              {{ $t('labels.navbar.prescriptions') }}
            </div>
          </b-navbar-item>
          <b-navbar-item
            v-if="userType === 'patient' || userType === 'insurer' || userType === 'doctor'"
            tag="router-link"
            to="/insurance"
            class="has-text-primary"
          >
            <div class="navbar-item-text">
              {{ $t('labels.navbar.insurance') }}
            </div>
          </b-navbar-item>
        </template>

        <template slot="end">
          <template>
            <!-- <b-navbar-item tag="div" class="has-text-primary">
              {{ $t('labels.account') }}: {{userType || ''}}
            </b-navbar-item> -->
            <b-navbar-item tag="div" class="has-text-primary right-nav-item">
              <language-switcher></language-switcher>
            </b-navbar-item>
            <b-navbar-item tag="div">
              <user-address
                v-if="
                  userType === 'patient' ||
                  userType === 'insurer' ||
                  userType === 'doctor' ||
                  userType === 'pharmacy'
                "
                :address="userType"
                class="has-background-primary-light mt-1"
                truncate
              />
            </b-navbar-item>
            <b-navbar-item tag="div" class="right-nav-item">
              <b-button
                inverted
                v-if="userType !== undefined"
                size="is-primary is-small"
                @click="signIn()"
                class="small-nav-element"
                id="login"
              >
                {{ $t('labels.navbar.signout') }}
              </b-button>

              <b-button
                inverted
                v-else
                size="is-primary is-small"
                @click="
                  signIn();
                  isComponentModalActive = true;
                "
                class="small-nav-element"
                id="login"
              >
                {{ $t('labels.navbar.signin') }}
              </b-button>
            </b-navbar-item>
          </template>
        </template>
      </b-navbar>
    </header>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <Login @close="props.close"></Login>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue';
import LanguageSwitcher from '../LanguageSwitcher.vue';
import Login from '../Welcome.vue';
import UserAddress from '../UserAddress.vue';
import '../../assets/scss/main.scss';

export default {
  components: {
    LanguageSwitcher,
    UserAddress,
    Login,
  },
  name: 'Navbar',
  props: {
    msg: String,
  },
  data() {
    return {
      isComponentModalActive: false,
      lblLogedOut: this.$i18n.t('labels.navbar.logedOut'),
    };
  },
  computed: {
    userType() {
      return this.$store.state.userType;
    },
  },
  methods: {
    signIn() {
      if (this.userType !== undefined) {
        Vue.$toast.open({
          message: this.lblLogedOut,
          type: 'success',
          duration: 1000,
          pauseOnHover: true,
          position: 'top-right',
        });
      }
      this.$store.commit('userType', undefined);
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  display: inline;
  color: #fff;
}

.right-nav-item {
  padding: 0;
}

.small-nav-element {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
</style>
