<template>
  <div class="cars">
    <div class="loader" v-if="loading">LOADING</div>
    <H1>Cars</H1>
    <div class="wrapper">
      <div class="car-plate" v-for="car in getCarList" :key="car.id" :data-id="car.id" @click="getCurrentAdv($event)">
        <div>Make - {{car.make}}</div>
        <div>Price - {{car.price}}</div>
        <img :src="car.windowCarImageUrl" style="width:150px; height:150px">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase/app'
export default {
  name: 'Cars',

  data () {
    return {
      loading: false,
      carList: [''],
      carAdvImgList: []
    }
  },

  computed: {
    ...mapGetters(['getCarList']),
    listOfcars () {
      return this.carList
    }
  },

  methods: {
    ...mapActions(['getAdvs']),
    getCurrentAdv (e) {
      const advId = e.target.dataset.id
      firebase.storage().ref(`images/in-stock-cars/${advId}`).listAll().then(snap => {
        snap.items.forEach(itemRef => {
          itemRef.getDownloadURL().then(imgUrl => {
            this.carAdvImgList.push(imgUrl)
          })
        })
      }).then(() => {
        console.log(this.carAdvImgList)
      })
    }
  },

  beforeMount () {
    this.getAdvs().then((list) => {
      this.loading = false
      this.carList = list
    })
  }
}
</script>

<style lang="scss">
  h1 {
    color: #fff;
  }

  .wrapper {
    display: flex;
  }
  .car-plate {
    height: 200px;
    width: 200px;
    background-color: darkcyan;
    margin-right: 10px;
  }

  .loader {
  width: 100vw;
  height: 100vh;
  font-size: 55px;
  text-align: center;
  padding-top: 250px;
  color: #ffffff;
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
