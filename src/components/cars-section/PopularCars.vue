<template>
  <div class="cars-section_popular-cars-wrapper">

    <div class="cars-section_popular-cars">
      <div class="car-section_popular-car-item">
        <img class="car-section_popular-car-image" src="@/assets/img/popular_cars_img/car4.jpg" alt="Популярное Авто">
        <div class="car-section_popular-car-name">Chevrolet Cruze</div>
        <div class="car-section_popular-car-price">
          9000$
          <div class="car-section_popular-car-detail-link">
            <a href="/cars"><img src="@/assets/img/Vector.svg" alt="Car Details"></a>
          </div>
        </div>
      </div>

      <div class="car-section_popular-car-item">
        <img class="car-section_popular-car-image" src="@/assets/img/popular_cars_img/car5.jpg" alt="Популярное Авто">
        <div class="car-section_popular-car-name">Chevrolet Cruze</div>
        <div class="car-section_popular-car-price">
          9000$
          <div class="car-section_popular-car-detail-link">
            <a href="/cars"><img src="@/assets/img/Vector.svg" alt="Car Details"></a>
          </div>
        </div>
      </div>

      <div class="car-section_popular-car-item">
        <img class="car-section_popular-car-image" src="@/assets/img/popular_cars_img/car6.jpg" alt="Популярное Авто">
        <div class="car-section_popular-car-name">Chevrolet Cruze</div>
        <div class="car-section_popular-car-price">
          9000$
          <div class="car-section_popular-car-detail-link">
            <a href="/cars"><img src="@/assets/img/Vector.svg" alt="Car Details"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="watch-all-popular-link">
      <a href="/cars">
        <span>Смотреть все</span>
        <img src="@/assets/img/Vector_small.svg" alt="All in Stock">
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PopularCars'
}
</script>
