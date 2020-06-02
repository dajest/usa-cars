<template>
  <div class="car-section_content-wrapper">
    <popular-cars  v-if="renderPopular"/>
    <in-stock-cars v-else/>
  </div>
</template>

<script>
import InStockCars from '@/components/cars-section/InStockCars.vue'
import PopularCars from '@/components/cars-section/PopularCars.vue'

export default {
  name: 'CarsSectionContent',

  props: {
    renderPopular: {
      type: Boolean,
      required: true
    }
  },

  components: {
    InStockCars, PopularCars
  },

  data () {
    return {
      showPopularCarsComponent: true
    }
  }
}
</script>
