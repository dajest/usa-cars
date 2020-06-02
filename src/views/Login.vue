<template>
  <div class="login-page">
    <div class="container">
      <h1>Это страница для администратора</h1>

      <div class="login-email-block">
        <label for="email">Email </label>
        <input
          id="email"
          class="login-email-input"
          type="email"
          v-model.trim="email">
      </div>
      <div class="login-password-block">
        <label for="password">Password </label>
        <input
        class="login-password-input"
          id="password"
          type="password"
          v-model.trim="password">
      </div>

      <button class="login-button" @click="loginHandler">Submit</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Login',

  data: () => ({
    email: '',
    password: ''
  }),

  methods: {
    /* eslint-disable */

    async loginHandler () {
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/admin')
      } catch (e) {}
    }
  }
}
</script>
