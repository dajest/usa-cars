<template>
  <div class="admin-page">

    <!-- Car details Form -->
    <div class="car-profile-form-creation">
      <div class="form">
        <div class="input-field">
          <input type="text" v-model="make" placeholder="Марка">
        </div>

        <div class="input-field">
          <input type="text" v-model="model" placeholder="Модель">
        </div>

        <div class="input-field">
          <input type="text" v-model="year" placeholder="Год">
        </div>

        <div class="input-field">
          <input type="text" v-model.number="engineVolume" placeholder="Объём">
        </div>

        <div class="input-field" placeholder="">
          <input type="text" v-model="status" placeholder="Статус">
        </div>

        <div class="input-field">
          <input type="text" v-model="damageGrade" placeholder="Степень повреждений">
        </div>

        <div class="input-field">
          <input type="text" v-model="running" placeholder="На ходу">
        </div>

        <div class="input-field">
          <input type="text" v-model="fixPartsAvailable" placeholder="Наличие запчастей для ремонта">
        </div>

        <div class="input-field">
          <input type="text" v-model="milege" placeholder="Пробег">
        </div>

        <div class="input-field">
          <input type="text" v-model="additionalCosts" placeholder="Дополнительные оплаты">
        </div>

        <div class="input-field">
          <input type="text" v-model="customTaxed" placeholder="Растаможен">
        </div>

        <div class="input-field">
          <input type="text" v-model="price" placeholder="Цена">
        </div>

        <div class="input-field checkbox">
          <label for="window">На витрину</label>
          <input id="window" type="checkbox" :disabled="windowFull" v-model="windowCar" @input="check">
        </div>
        <div class="create-new-form" @click="createAd">
          Создать новый Автомобиль
        </div>
      </div>
    </div>

    <!-- Car Images Block -->
    <div class="car-images-block" v-show="profileDataFilled">

      <input type="file" accept="image/*" multiple ref="fileInput" @change="onFileChange">
      <button @click="uploadImages">UPLOAD IMAGES</button>
      <div class="image-preview-wrapper">
        <div class="image-preview" v-for="(image, key) in images" :key="key">
            <div>
              <img class="preview" :ref="'image'" />
              {{ image.name }}
            </div>
          </div>
      </div>
    </div>

    <!-- Car List Block -->

    <div class="car-list-block">
      <div class="car-list-item">
        <div class="car-image">
          <img src="@/assets/img/in_stock_cars_img/car2.jpg" alt="CarPreview">
        </div>
        <div class="car-name-info">
          <span class="car-make">AUDI</span>
          <span class="car-model">A4 B8 Avant</span>
          <span class="car-year">2014</span>
        </div>
        <div class="car-milege">
          <span class="milege-header">Пробег</span>
          <span class="milege-count">15 000</span>
        </div>

        <div class="car-price">
          <span class="car-price-header">Цена</span>
          <span class="car-price-amount">15 000 $</span>
        </div>

        <div class="car-adv-action-block">
          <div class="edit-action">Редактировать</div>
          <div class="delete-action">Удалить</div>
        </div>
      </div>
    </div>

      <button class="logout" @click="logout">LOGOUT</button>
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */
import firebase from 'firebase/app'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Admin',
  components: {
    //
  },

  data: () => ({
    login: '',
    password: '',
    dataBoom: null,
    pickedFiles: null,
    pickedFileNames: [],
    images: [],
    profileDataFilled: false,
    windowFull: null,

    make: '',
    model: '',
    year: null,
    engineVolume: null,
    status: '',
    damageGrade: '',
    running: '',
    fixPartsAvailable: '',
    milege: null,
    additionalCosts: '',
    customTaxed: '',
    price: null,
    windowCar: false,
    windowCarImageUrl: '',
    imageURLs: [],
    carAdvId: ''
  }),

  computed: {
    ...mapGetters(['getCarList']),

    carList () {
      return this.getCarList
    }
  },

  watch: {
    getCarList: {
      handler: function(val) {
        this.setWindowFull(val)
      },
      deep: true
    }
  },

  methods: {
    ...mapActions(['getAdvs']),

    setWindowFull (val) {
      let counter = 0
      val.forEach(carAdv => {
        if (carAdv.windowCar) {
          counter++
          if ( counter < 3) {
            return
          }
          else {
            this.windowFull = true
          }
        }
      })

    },

    check () {
      this.windowCar = !this.windowCar
      console.log(this.windowCar)
    },

    onFileChange(e) {
      this.images = []
      let vm = this;
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.images.push(selectedFiles[i]);
      }

      for (let i = 0; i < this.images.length; i++) {
        let reader = new FileReader();

        reader.onload = (e) => {
          this.$refs.image[i].src = reader.result;
        };

        reader.readAsDataURL(this.images[i]);
      }
    },

    async uploadImages (e) {

      let fileUpload = this.$refs.fileInput
      let files = fileUpload.files
      let newImageURLs = []
      let record = (await firebase.database().ref(`/cars/${this.carAdvId}`).once('value')).val()
      let windowCarImgUrl = ''

      files.forEach( async (file) => {
        let storageRef = firebase.storage().ref(`images/in-stock-cars/${this.carAdvId}/${file.name}`)
        await storageRef.put(file)
        storageRef.getDownloadURL().then((url) => {
          if (file.name.indexOf('window') > -1)  {
            windowCarImgUrl = url
          }
          newImageURLs.push(url)
          return newImageURLs
        }).then((imgURLs) => {
          firebase.database().ref(`/cars/${this.carAdvId}`).set({
            ...record,
            imageURLs: imgURLs,
            windowCarImageUrl: windowCarImgUrl
          })
        });
      })

      let setImageChanges = await firebase.database().ref(`/cars/${this.carAdvId}`).set({
        imageURLs: newImageURLs
      })

    },


    async createAd () {
      const carData = {
        make: this.make,
        model: this.model,
        year: this.year,
        engineVolume: this.engineVolume,
        status: this.status,
        damageGrade: this.damageGrade,
        running: this.running,
        milege: this.milege,
        additionalCosts: this.additionalCosts,
        customTaxed: this.customTaxed,
        price: this.price,
        windowCar: this.windowCar,
        imageURLs: ['0'],
        windowCarImageUrl: '',
        carAdvId: ''
        }
      try {
        const carAdv = await this.$store.dispatch('createAdv', carData)
        this.carAdvId = carAdv.id
        this.profileDataFilled = true
        console.log(this.carAdvId)
      } catch (error) {
        console.log(error)
      }
    },

    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
