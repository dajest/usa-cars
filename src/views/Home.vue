<template>
  <div class="homepage">
      <section class="main-banner-section">
        <div class="main-banner-section_message">
          <div class="main-banner-section_message-title">
            Автомобили из США и Канады
          </div>
          <div class="main-banner-section_message-text">
            Поиск, доставка и восстановление «под ключ» автомобилей с повреждениями из США и Канады
          </div>
        </div>
      </section>
      <div class="container">
        <cars-section />
        <about-us/>
        <services/>
        <additional-services/>
        <Footer/>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CarsSection from '@/components/cars-section/CarsSection.vue'
import AboutUs from '@/components/AboutUs.vue'
import Services from '@/components/Services.vue'
import AdditionalServices from '@/components/AdditionalServices.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    CarsSection, AboutUs, Services, AdditionalServices, Footer
  }
}
</script>
