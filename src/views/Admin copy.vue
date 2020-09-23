<template>
  <div class="admin-page">

    <div class="admin-page-header">
      <h1>Создание обьявления Автомобиля</h1>
    </div>

    <div class="creation-steps" v-if="creationStep == 1">
      <div class="step step1">1</div>
    </div>

    <div class="creation-steps" v-else>
      <div class="step step1">2</div>
    </div>

    <div class="steps-tab-container">
      <!-- Car details Form -->
      <div class="car-profile-form-creation" v-if="creationStep == 1">
        <div class="form">
          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="make" placeholder="Марка">
            </div>

            <div class="input-field">
              <input type="text" v-model="model" placeholder="Модель">
            </div>

            <div class="input-field">
              <input type="text" v-model="year" placeholder="Год">
            </div>
          </div>
          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model.number="engineVolume" placeholder="Объём">
            </div>

            <div class="input-field" placeholder="">
              <input type="text" v-model="status" placeholder="Статус">
            </div>

            <div class="input-field">
              <input type="text" v-model="damageGrade" placeholder="Степень повреждений">
            </div>
          </div>
          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="running" placeholder="На ходу">
            </div>

            <div class="input-field">
              <input type="text" v-model="fixPartsAvailable" placeholder="Наличие запчастей для ремонта">
            </div>

            <div class="input-field">
              <input type="text" v-model="milege" placeholder="Пробег">
            </div>
          </div>
          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="additionalCosts" placeholder="Дополнительные оплаты">
            </div>

            <div class="input-field">
              <input type="text" v-model="customTaxed" placeholder="Растаможен">
            </div>

            <div class="input-field">
              <input type="text" v-model="price" placeholder="Цена">
            </div>
          </div>
          <div class="form-line">
            <div class="input-field checkbox">
              <label for="window">На витрину</label>
              <input id="window" type="checkbox" :disabled="windowFull" v-model="windowCar">
            </div>
          </div>
        </div>
        <div v-if="!advEditModeOn" class="create-new-form" @click="createAd">
          Добавить фотографии
        </div>
        <div v-else class="update-form" @click="updateAdv">
          Обновить обьявление
        </div>
      </div>

      <!-- Car Images Block -->
      <div class="car-images-block" v-show="creationStep == 2">
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
      <div class="car-list-block" v-if="getCarList.length">
        <div class="car-list-item" v-for="car in carList" :key="car.id">
          <div class="car-image">
            <img :src="car.imageURLs[0]" alt="CarPreview">
          </div>
          <div class="car-name-info">
            <span class="car-make">{{car.make}}</span>
            <span class="car-model">{{car.model}}</span>
            <span class="car-year">{{car.year}}</span>
          </div>
          <div class="car-milege">
            <span class="milege-header">Пробег</span>
            <span class="milege-count">{{car.milege}}</span>
          </div>

          <div class="car-price">
            <span class="car-price-header">Цена</span>
            <span class="car-price-amount">{{car.price}} $</span>
          </div>

          <div class="car-adv-action-block" ref="reloader" >
            <div class="edit-action" :data-id="car.id" @click="editAdv" ref="edit">Редактировать</div>
            <div class="delete-action" :data-id="car.id" @click="deleteAdv" ref="delete">Удалить {{car.id}}</div>
          </div>
        </div>
      </div>

    </div>

      <button class="logout" @click="logout">LOGOUT</button>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/app'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Admin',

  data: () => ({
    login: '',
    password: '',
    dataBoom: null,
    pickedFiles: null,
    pickedFileNames: [],
    images: [],
    windowFull: null,
    carList: [],
    advEditModeOn: false,
    creationStep : 1,

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
    carData () {
      return {
        make: this.make,
        model: this.model,
        year: this.year,
        engineVolume: this.engineVolume,
        status: this.status,
        damageGrade: this.damageGrade,
        running: this.running,
        fixPartsAvailable: this.fixPartsAvailable,
        milege: this.milege,
        additionalCosts: this.additionalCosts,
        customTaxed: this.customTaxed,
        price: this.price,
        windowCar: this.windowCar,
        imageURLs: this.imageURLs,
        windowCarImageUrl: this.windowCarImageUrl,
        carAdvId: ''
      }
    }
  },

  watch: {
    getCarList: {
      handler: function(val) {
        this.setWindowFull(val)
        this.carList = val
      },
      deep: true
    }
  },
  beforeMount () {
    this.$store.dispatch('getAdvs')
  },


  methods: {
    ...mapActions(['getAdvs']),

    // async deleteAdv () {
    //   const advId = this.$refs.delete[0].dataset.id
    //   let agree = confirm('Вы действительно хотите удалить обьявление?');
    //   if (agree) {
    //     let removedRecord = (await firebase.database().ref(`/cars/${advId}`)).remove()
    //     window.location.reload()
    //   }
    // },

    async editAdv () {
      this.creationStep == 1
      const advId = this.$refs.edit[0].dataset.id
      this.advEditModeOn = true
      let car = (await firebase.database().ref(`/cars/${advId}`).once('value')).val()
      console.log(car)

      this.make = car.make,
      this.model = car.model ,
      this.year = car.year,
      this.engineVolume = car.engineVolume,
      this.status = car.status,
      this.damageGrade = car.damageGrade,
      this.running = car.running,
      this.fixPartsAvailable = car.fixPartsAvailable,
      this.milege = car.milege,
      this.additionalCosts = car.additionalCosts,
      this.customTaxed = car.customTaxed,
      this.price = car.price,
      this.windowCar = car.windowCar,
      this.windowCarImageUrl = car.windowCarImageUrl,
      this.imageURLs = car.imageURLs,
      this.carAdvId = car.advId
    },

    async updateAdv () {
      let record = (await firebase.database().ref(`/cars/${this.carAdvId}`).once('value')).val() // Create action in store
      firebase.database().ref(`/cars/${this.carAdvId}`).set(this.carData)
      window.location.reload()
    },

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
      let record = (await firebase.database().ref(`/cars/${this.carAdvId}`).once('value')).val() // Create action in store
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
        }).then(() => {
          window.location.reload()
        });
      })
    },

    async createAd () {
      this.creationStep = 2

      try {
        const carAdv = await this.$store.dispatch('createAdv', this.carData)
        this.carAdvId = carAdv.id
      } catch (error) {
        throw error
      }
    },

    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
