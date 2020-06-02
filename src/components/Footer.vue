<template>
  <footer>
    <div class="footer-address-block">
      <p class="footer-address-block_header">
        Головной офис и СТО
      </p>
      <p>
        Минская обл. Минский р-н, <br>
        а/г Колодищи, ул. Парковая 27
      </p>
    </div>
    <div class="footer-contacts-block">
      <p class="footer-contacts-block_header">
        Телефоны
      </p>
      <p>
        +375 29 653 40 76  Velcom / Viber / Whats App <br>
        +375 33 376 65 52  МТС
      </p>

      <p>
        <span class="skype">Skype: </span> <span>litan71</span>
      </p>
      <p>
        <span class="email">Skype: </span> <span>usa-autoby@yandex.ru</span>
      </p>
    </div>
    <div class="footer-subscribe-block">
      <p class="footer-subscribe-block_header">
        Подпишитесь на уведомления о поступлении <br>
        новых автомобилей
      </p>
      <form action="post">
        <!-- <p>
          <input type="file" accept="image/*" multiple @change="filePicked($event)" ref="fileInput">
          <img :src="imageURL" alt="">
        </p> -->
        <input class="subscribe-input" type="email" placeholder="Ваш E-mail">
        <button class="subscribe-action">подписаться</button>
      </form>
    </div>
  </footer>
</template>

<script>
// import firebase from 'firebase/app'

export default {

  data () {
    return {
      // pickedFile: null,
      // pickedFileName: '',
      // imageURL: ''
    }
  },

  methods: {
    // filePicked (e) {
    //   this.pickedFile = e.target.files[0]
    //   this.pickedFileName = e.target.files[0].name

    //   const storageRef = firebase.storage().ref('images/' + this.pickedFileName)
    //   const uploadTask = storageRef.put(this.pickedFile)

    //   uploadTask.on('state_changed', snapshot => {
    //     const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //     console.log(progress)
    //   }, error => {
    //     console.log(error.message)
    //   }, () => {
    //     uploadTask.snapshot.ref.getDownloadURL().then(downnloadUrl => {
    //       this.imageURL = downnloadUrl
    //     })
    //   })
    // }
  }
}
</script>
