<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-menu">
      <b-navbar-brand to="/home"><img id="logo" src="@/assets/img/logo.png"/></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="navbar-item" to="/home" exact><div class="navbar-item-text">Healthcare</div></b-nav-item>
          <b-nav-item class="navbar-item" to="/insurance"><div class="navbar-item-text">Insurance</div></b-nav-item>
          <b-nav-item class="navbar-item" to="/recepies"><div class="navbar-item-text">Recepies</div></b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown class="navbar-item" text="Lang" right>
            <b-nav-item class="navbar-item" href="#">EN</b-nav-item >
            <b-nav-item class="navbar-item" href="#">BG</b-nav-item >
          </b-nav-item-dropdown>
          <b-nav-item class="navbar-item" to="/"><div class="navbar-item-text">Sign Out</div></b-nav-item>
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
  }
}
</script>