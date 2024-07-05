<template>
  <view :class="$route.meta.navbartype">
    <toastNotifications/>
    <HomeNavbar v-if="showHomeNavbar" />
    <PanelNavbar v-if="showPanelNavbar" />
    <main >
      <router-view></router-view>
      <Footer/>
    </main>
  </view>
</template>

<script>
import HomeNavbar from './components/common/HomeNavbar.vue';
import PanelNavbar from './components/common/PanelNavbar.vue';
import Footer from './components/common/Footer.vue';
import toastNotifications from './components/common/ToastNotifications.vue';

export default {
  name: 'App',
  components: {
    HomeNavbar,
    PanelNavbar,
    Footer,
    toastNotifications
  },

  computed: {
    showHomeNavbar() {
      return this.$route.meta.navbartype === 'welcome';
    },
    showPanelNavbar() {
      return this.$route.meta.navbartype === 'panel';
    }
  }
}
</script>

<style>

  @import "@/assets/css/base.css";
  @import "@/assets/css/main.css";
  @import "@/assets/css/vars.css";
  @import "@/assets/css/common/footer.css";
  @import "@/assets/css/common/tooltip.css";

</style>
