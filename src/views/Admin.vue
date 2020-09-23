<template>
  <div class="admin-page">
    <div class="loader" v-if="loader"></div>
    <button class="logout" @click="logout">LOGOUT</button>

    <div class="tabs-wrapper">
      <div class="creation-tab tab" :class="{'active' : creationTabActive}" @click="tabSwitcher">Создание обьявления Автомобиля</div>
      <div class="edit-tab tab" :class="{'active' : !creationTabActive}" @click="tabSwitcher">Список Автомобилей / Редактирование</div>
    </div>

    <div class="creation-area" v-if="creationTabActive">

      <!-- Car details Form -->
      <div class="car-profile-form-creation">
        <div class="form">
          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="carDetails.make" placeholder="Марка">
            </div>
            <div class="input-field">
              <input type="text" v-model="carDetails.model" placeholder="Модель">
            </div>
          </div>
          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="carDetails.year" placeholder="Год">
            </div>

            <div class="input-field">
              <input type="text" v-model.number="carDetails.engineVolume" placeholder="Объём">
            </div>
          </div>

          <div class="form-line">
            <div class="input-field" placeholder="">
              <input type="text" v-model="carDetails.status" placeholder="Статус">
            </div>

            <div class="input-field">
              <input type="text" v-model="carDetails.damageGrade" placeholder="Степень повреждений">
            </div>
          </div>

          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="carDetails.running" placeholder="На ходу">
            </div>

            <div class="input-field">
              <input type="text" v-model="carDetails.fixPartsAvailable" placeholder="Наличие запчастей для ремонта">
            </div>
          </div>

          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="carDetails.milege" placeholder="Пробег">
            </div>

            <div class="input-field">
              <input type="text" v-model="carDetails.additionalCosts" placeholder="Дополнительные оплаты">
            </div>
          </div>

          <div class="form-line">
            <div class="input-field">
              <input type="text" v-model="carDetails.customTaxed" placeholder="Растаможен">
            </div>

            <div class="input-field">
              <input type="text" v-model="carDetails.price" placeholder="Цена">
            </div>
          </div>

          <div class="form-line">
            <div class="input-field checkbox">
              <label for="window">На витрину</label>
              <input id="window" type="checkbox" :disabled="windowFull" v-model="carDetails.windowCar">
            </div>
          </div>
        </div>
      </div>

      <!-- Car Images Block -->
      <div class="car-images-block">
        <div class="select-file-box">
          <div class="choose-foto-btn-block">
            <input type="file" accept="image/*" multiple ref="fileInput" id="file-select" @change="imageFileSelection">
            <label for="file-select">Выбрать фотографии</label>
          </div>
          <div class="create-adv-button-block">
            <button v-if="showCreateAdvButton" class="create-adv" @click="uploadImages">Создать обьявление</button>
          </div>
        </div>
        <div class="image-preview-wrapper" v-if="images">
          <div class="image-preview" v-for="(image, key) in images" :key="key">

              <img class="preview" :ref="'image'" />
              <div class="image-name">
                {{ image.name }}

              </div>
          </div>
        </div>

      </div>
    </div>

    <div class="edit-area" v-if="!creationTabActive">
      <!-- Car List Block -->
      <div class="car-list-block">
        <div class="car-list-item" :class="{'open': advEditModeOn }" v-for="car in advList" :key="car.id">
          <div class="car-details-block">
            <div class="car-image">
              <img v-if="car.imageURLs" :src="car.imageURLs[0]" alt="CarPreview">
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
              <div class="edit-action" v-if="advEditModeOn" :data-id="car.carAdvId" @click="stopEdition" ref="edit">Отменить</div>
              <div class="edit-action" v-else :data-id="car.carAdvId" @click="editAdv($event)" ref="edit">Редактировать</div>
              <div class="delete-action" :data-id="car.carAdvId" @click="deleteAdv" ref="delete">Удалить</div>
            </div>
          </div>
          <div class="car-edit-form">
            <div class="car-profile-form-edition">
              <div class="form">
                <div class="form-line">
                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.make" placeholder="Марка">
                  </div>
                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.model" placeholder="Модель">
                  </div>
                </div>
                <div class="form-line">
                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.year" placeholder="Год">
                  </div>

                  <div class="input-field">
                    <input type="text" v-model.number="advEditDetails.engineVolume" placeholder="Объём">
                  </div>
                </div>

                <div class="form-line">
                  <div class="input-field" placeholder="">
                    <input type="text" v-model="advEditDetails.status" placeholder="Статус">
                  </div>

                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.damageGrade" placeholder="Степень повреждений">
                  </div>
                </div>

                <div class="form-line">
                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.running" placeholder="На ходу">
                  </div>

                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.fixPartsAvailable" placeholder="Наличие запчастей для ремонта">
                  </div>
                </div>

                <div class="form-line">
                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.milege" placeholder="Пробег">
                  </div>

                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.additionalCosts" placeholder="Дополнительные оплаты">
                  </div>
                </div>

                <div class="form-line">
                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.customTaxed" placeholder="Растаможен">
                  </div>

                  <div class="input-field">
                    <input type="text" v-model="advEditDetails.price" placeholder="Цена">
                  </div>
                </div>

                <div class="form-line">
                  <div class="input-field checkbox">
                    <label for="window">На витрину</label>
                    <input id="window" type="checkbox" :disabled="windowFull" v-model="carDetails.windowCar">
                  </div>
                </div>
              </div>
            </div>
            <div class="images-edition-wrapper" v-if="editionImages && advEditModeOn">
              <div class="images-edition-block" v-for="(imageObject, index) in editionImages" :key="index">
                <img :src="imageObject.url" alt="LOGO">
                <div>{{imageObject.name}}</div>
                <span :data-id="imageObject.id" :data-name="imageObject.name" @click="deleteEditionPicture($event)">Delete</span>
              </div>
            </div>
            <button class="finish-editing" @click="finishEditing">Закончить редактирование</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/app'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Admin',

  data: () => ({
    carDetails: {
      make: '',
      model: '',
      year: '',
      engineVolume: '',
      status: '',
      damageGrade: '',
      running: '',
      fixPartsAvailable: '',
      milege: null,
      additionalCosts: '',
      customTaxed: '',
      price: null,
      windowCar: false,
      windowCarImageUrl: 'lolo',
      imageURLs: [],
      carAdvId: '',
    },

    advEditDetails: {},

    beginOfEditinState: {},
    images: [],
    editionImages: [],
    imagesDeletedOnEdit: [],
    windowFull: null,
    carList: [],
    advEditModeOn: false,
    editionId: '',
    loader: false,
    creationTabActive: true,
    createBtnDisabled: true,
    showCreateAdvButton: false
  }),


  computed: {
    ...mapGetters(['advList', 'currentAdvId', 'currentAdv']),
  },

  watch: {
    advList: {
      handler: function(val) {
        console.log(val)
        this.setWindowFull(val)
        this.carList = val
        this.carDetails.carAdvId = this.currentAdvId
      },
      deep: true
    }
  },

  methods: {
    ...mapActions(['createAdv']),

    advCreation () {
      this.$store.dispatch('createAdv', this.carDetails)
    },

    imageFileSelection(e) {
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
      this.advCreation()
      this.showCreateAdvButton = true
    },

    async uploadImages (e) {
      this.loader = true
      let fileUpload = this.$refs.fileInput
      let files = Array.prototype.slice.call(fileUpload.files)
      let newImageURLs = []
      let windowCarImgUrl = ''

      await Promise.all(files.map(async (file) => {
        let storageRef = firebase.storage().ref(`images/in-stock-cars/${this.carDetails.carAdvId}/${file.name}`)
        await storageRef.put(file)
        await storageRef.getDownloadURL().then((url) => {
          if (file.name.indexOf('window') > -1)  {
            windowCarImgUrl = url
          }
          newImageURLs.push(url)
        })
      }))

      firebase.database().ref(`/cars/${this.carDetails.carAdvId}`).set({
        ...this.carDetails,
        windowCarImageUrl: windowCarImgUrl,
        imageURLs: newImageURLs
      })
      .then(() => {
        window.location.reload()
      })
    },

    async editAdv (e) {
      this.advEditModeOn = true
      this.editionId = this.$refs.edit[0].dataset.id
      let car = (await firebase.database().ref(`/cars/${this.editionId}`).once('value')).val()

      this.beginOfEditinState = {...car}
      this.advEditDetails = {...car}

      const filesList = await firebase.storage().ref().child(`/images/in-stock-cars/${this.editionId}`).listAll()
      const filesArray = filesList.items
      const imageNamesList = filesList.items.map(file => file.name)

      if (filesArray.length) {
        this.editionImages = car.imageURLs.map((picture, index) => {
          return {
            name: imageNamesList[index],
            url: picture,
            id: this.editionId
          }
        })
      }
    },

    deleteEditionPicture(e) {
      const editPictureName = e.target.getAttribute('data-name')
      this.imagesDeletedOnEdit.push(editPictureName)
      this.editionImages.forEach((file, index) => {
        if(file.name == editPictureName) {
          this.editionImages.splice(index,1)
        }
      })
    },

    async stopEdition(e) {
      this.advEditModeOn = false
      firebase.database()
        .ref(`/cars/${this.editionId}`)
        .update({...this.beginOfEditinState})
        .then(()=> {
          window.location.reload()
        })

      const filesList = await firebase.storage().ref().child(`/images/in-stock-cars/${car.carAdvId}`).listAll()
      const filesArray = filesList.items
      const imageNamesList = filesList.items.map(file => file.name)

      if (filesArray.length) {
        this.editionImages = car.imageURLs.map((picture, index) => {
          return {
            name: imageNamesList[index],
            url: picture,
            id: this.editionId
          }
        })
      }
    },

    finishEditing() {
      this.advEditDetails.imageURLs = this.editionImages.map(image => image.url)
      this.imagesDeletedOnEdit.forEach(async imageName => {
          await firebase.storage().ref().child(`/images/in-stock-cars/${this.editionId}/${imageName}`).delete()
      })
      firebase.database()
        .ref(`/cars/${this.editionId}`)
        .update({...this.advEditDetails})
        .then(()=> {
            window.location.reload()
        })
    },

    async deleteAdv () {
      const advId = this.$refs.delete[0].dataset.id
      let agree = confirm('Вы действительно хотите удалить обьявление?');
      if (agree) {

        // Removing Car Adv
        let removedRecord = (await firebase.database().ref(`/cars/${advId}`)).remove()

        // Delete the car pictures

        const filesList = await firebase.storage().ref().child(`/images/in-stock-cars/${advId}`).listAll()
        const filesArray = filesList.items
        filesArray.forEach(file => {
          firebase.storage().ref().child(`/images/in-stock-cars/${advId}/${file.name}`).delete()
        })

        window.location.reload()
      }
    },

    tabSwitcher() {
      this.creationTabActive = !this.creationTabActive
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

    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>


<style lang="scss">
.tabs-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.tab {
  border: 1px solid #1cb841;
  padding: 20px;

  &:last-child {
    border-left: none;
  }

  &.active {
    background: rgba($color: #1cb841, $alpha: .4);
  }
}

.creation-area {
  display: flex;
}
</style>
