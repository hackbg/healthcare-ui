<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-menu">
      <b-navbar-brand to="/home">
        <img id="logo" src="@/assets/img/logo.png"/>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>

          <b-nav-item class="navbar-item" to="/home" exact>
            <div class="navbar-item-text">
              {{ $t('labels.navbar.healthcare') }}
            </div>
          </b-nav-item>

          <b-nav-item v-if="userType === 'doctor' || userType === 'insurer'" class="navbar-item" to="/insurance">
            <div class="navbar-item-text">
              {{ $t('labels.navbar.insurance') }}
            </div>
          </b-nav-item>

          <b-nav-item v-if="userType === 'patient'" class="navbar-item" to="/recepies">
            <div class="navbar-item-text">
              {{ $t('labels.navbar.prescriptions') }}
            </div>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown class="navbar-item" text="Lang" right>

            <b-nav-item class="navbar-item" href="#">
              {{ $t('labels.navbar.language.en') }}
            </b-nav-item >

            <b-nav-item class="navbar-item" href="#">
              {{ $t('labels.navbar.language.bg') }}
            </b-nav-item >     
          </b-nav-item-dropdown>

          <b-nav-item
            v-if="userType === 'patient' || userType === 'doctor' || userType === 'insurer' || userType === 'pharmacie'"
            class="navbar-item" @click="signOut()" to="/">
              <div class="navbar-item-text">
                {{ $t('labels.navbar.signout') }}
              </div>
          </b-nav-item>
          <b-nav-item v-else class="navbar-item" @click="signOut()" to="/">
            <div class="navbar-item-text">
              {{ $t('labels.navbar.signin') }}
            </div>
          </b-nav-item>

          
        </b-navbar-nav> 
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import '@/assets/css/navbar.css';
// import web3 from "../../web3/web3";

export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data: function() {
    return {
    //   web3
    }
  },
  computed: {
    userType() {
      return localStorage.userType;
    }
  },
  methods: {
    signOut() {
      localStorage.userType = undefined;
      if(this.$route.path != '/')
        this.$router.push('/');
    }
  }
}
</script>

router.push(route).catch(err => {
    // Ignore the vuex err regarding  navigating to the page they are already on.
    if (
      err.name !== 'NavigationDuplicated' &&
      !err.message.includes('Avoided redundant navigation to current location')
    ) {
      // But print any other errors to the console
      logError(err);
    }
  });