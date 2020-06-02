<template>
  <div class="cars-section_in-stock-cars-wrapper">

    <div class="cars-section_in-stock-cars">
      <div class="car-section_in-stock-car-item">
        <img class="car-section_in-stock-car-image" src="@/assets/img/in_stock_cars_img/car1.jpg" alt="Машина в наличии">
        <div class="car-section_in-stock-car-name">Chevrolet Cruze</div>
        <div class="car-section_in-stock-car-price">
          9000$
          <div class="car-section_in-stock-car-detail-link">
            <a href="/cars"><img src="@/assets/img/Vector.svg" alt="Car Details"></a>
          </div>
        </div>
      </div>

      <div class="car-section_in-stock-car-item">
        <img class="car-section_in-stock-car-image" src="@/assets/img/in_stock_cars_img/car2.jpg" alt="Машина в наличии">
        <div class="car-section_in-stock-car-name">Nissan Leaf</div>
        <div class="car-section_in-stock-car-price">
          4600$
          <div class="car-section_in-stock-car-detail-link">
            <a href="/cars"><img src="@/assets/img/Vector.svg" alt="Car Details"></a>
          </div>
        </div>
      </div>

      <div class="car-section_in-stock-car-item">
        <img class="car-section_in-stock-car-image" src="@/assets/img/in_stock_cars_img/car3.jpg" alt="Машина в наличии">
        <div class="car-section_in-stock-car-name">Toyota Prius</div>
        <div class="car-section_in-stock-car-price">
          Цена договорная
          <div class="car-section_in-stock-car-detail-link">
            <a href="/cars"><img src="@/assets/img/Vector.svg" alt="Car Details"></a>
          </div>
        </div>
      </div>
    </div>

    <div class="watch-all-in-stock-link">
      <a href="/cars">
        <span>Смотреть все</span>
        <img src="@/assets/img/Vector_small.svg" alt="All in Stock">
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InStockCars'

}
</script>
