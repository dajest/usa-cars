<template>
  <div class="main-layout">
    <NavBar />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'main-layout',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-around;
}
</style>
