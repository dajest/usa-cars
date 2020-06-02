<template>
  <div class="cars-section_tabs" :class="{'popular-active': isPopularActive}" ref="tabs">
    <div class="cars-section_in-stock-tab" :class="{'active-tab' : !isPopularActive}" @click="makeInStockActive($event)">
      В наличии
    </div>
    <div class="cars-section_popular-tab" :class="{'active-tab' : isPopularActive}" @click="makePopularActive($event)">
      Популярные к привозу
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarsTabs',

  data () {
    return {
      isPopularActive: false
    }
  },

  methods: {
    makePopularActive (event) {
      this.isPopularActive = true
      this.$emit('renderPopular')
    },

    makeInStockActive (event) {
      this.isPopularActive = false
      this.$emit('renderInStock')
    }
  }
}
</script>
