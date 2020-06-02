<template>
  <nav class="navigation-section">

    <div class="navigation-section_logo-block">
        <router-link class="navigation-link" to="/">АвтоХолдинг</router-link>
    </div>

    <div class="navigation-section_navigation-block">
      <router-link class="navigation-link" ref="navlink" to="/cars">Автомобили</router-link>
      <router-link class="navigation-link" ref="navlink" to="/services">Услуги</router-link>
      <router-link class="navigation-link" ref="navlink" to="/calculator">Калькулятор</router-link>
      <router-link class="navigation-link" ref="navlink" to="/news">Новости</router-link>
      <router-link class="navigation-link" ref="navlink" to="/contacts">Контакты</router-link>
      <router-link class="navigation-link hidden" ref="navlink" to="/login">Login</router-link>
      <router-link v-show="getUser ? true : false" class="navigation-link" ref="navlink" to="/admin">Admin</router-link>
    </div>

    <div class="navigation-section_phone-numbers">
      <div class="navigation-section_phone-number1">
        <a href="">+375 29 653 40 76</a>
      </div>
      <div class="navigation-section_phone-number2">
        <a href="">+375 33 376 65 52</a>
      </div>
    </div>

    <div class="navigation-section_call-request">
      Заказать звонок
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUser']),

    showAdminLink () {
      /* eslint-disable */
      return this.getUser ? true : false
    }
  }
}
</script>
