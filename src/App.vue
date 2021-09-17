<template>
  <div id="app">
    <Navbar/>
    <section class="section main">
      <div class="container is-max-desktop">
        <router-view/>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
.main {
  min-height: calc(100vh - 3.25rem - 13rem);
}
</style>
