<template>
  <section class="cars-section">
      <div class="cars-section_title">
        Автомобили
      </div>

      <cars-tabs @renderPopular="setPopularCarsComponent" @renderInStock="setInStockCarsComponent"/>
      <cars-section-content :renderPopular="showPopularCarsComponent"/>
  </section>
</template>

<script>
import CarsTabs from '@/components/cars-section/CarsTabs.vue'
import CarsSectionContent from '@/components/cars-section/CarsSectionContent.vue'

export default {
  name: 'CarsSection',

  components: {
    CarsTabs, CarsSectionContent
  },

  data () {
    return {
      showPopularCarsComponent: false
    }
  },

  methods: {
    setPopularCarsComponent () {
      this.showPopularCarsComponent = true
    },
    setInStockCarsComponent () {
      this.showPopularCarsComponent = false
    }
  }
}
</script>
