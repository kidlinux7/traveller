<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="mt-5 col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
      >
        <h3>156 Results in New York, US</h3>
        <div class="d-flex flex-row">
          <!-- Places -->
          <div class="btn-group p-1">
            <button
              type="button"
              class="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Any Price
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div>

          <!-- BedRooms -->
          <div class="btn-group p-1">
            <button
              type="button"
              class="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              2 - 4 Beds
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div>

          <!-- All Types -->
          <div class="btn-group p-1">
            <button
              type="button"
              class="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              All Types
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div>
        </div>

        <!-- Sort -->
        <div class="row">
          <div class="d-flex justify-content-end">
            <div
              class="
                col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12
              "
            >
              <div class="d-flex align-items-center">
                <p>Sort by</p>
                <div class="btn-group p-1">
                  <button
                    type="button"
                    class="btn btn-light dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Price
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li>
                      <a class="dropdown-item" href="#">Another action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <a class="dropdown-item" href="#">Separated link</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Results cards -->
        <div class="row" id="leftBox">
          <!-- <div v-for="restaraunt in restaurants" v-bind:key="restaraunt.id"> -->
          <div v-if="loader">
            <div class="container">
              <div class="row mx-auto">
                <div
                  class="
                    col-xxl-4
                    col-xl-4
                    col-lg-4
                    col-md-6
                    col-sm-12
                    col-xs-12
                    col-12
                  "
                  v-for="index in 9"
                  :key="index"
                >
                  <div
                    class="skeleton skeleton-rect mx-auto"
                    style="--rect-h: 300px; --t: 0.6s"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div > -->
          <div
            v-else
            v-for="restaraunt in restaurants"
            v-bind:key="restaraunt.id"
            class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6"
          >
            <div class="card" style="width: 18rem" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <div v-if="restaraunt.photo === undefined">
                <div
                  class="skeleton skeleton-rect mx-auto"
                  style="--rect-h: 300px; --t: 0.6s"
                ></div>
              </div>
              <div v-else>
                <img
                  :src="restaraunt.photo.images.original.url"
                  class="card-img-top"
                  alt="..."
                />
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ restaraunt.address }}</h5>
                <p class="card-text">{{ restaraunt.name }}</p>
                <p class="card-price">{{ restaraunt.price }}</p>
              </div>
            </div>
          </div>
          <!-- </div> -->

          <!-- </div> -->
        </div>
      </div>

<!-- Offcanvas -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
</div>

      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div id="mapSection"></div>
      </div>
    </div>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import "css-skeletons";

export default {
  name: "IndexPage",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoibWFsaWstIiwiYSI6ImNsMWR5NTNzZjBseHIzYnAydHNhZThzd3UifQ.9c1XElq7v4Jwy0HfjxcSRA",
    };
  },
  beforeMount() {
    this.$store.dispatch("getAllRestaurants");
  },
  computed: {
    loader() {
      return this.$store.getters.loader;
    },
    restaurants() {
      return this.$store.getters.restaurants;
    },
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    new mapboxgl.Map({
      container: "mapSection",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [6.7924, 39.2083],
      zoom: 4,
      marker: true,
      // maxBounds: [
      //   [103.6, 1.1704753],
      //   [104.1, 1.4754753],
      // ],
    });

    // Add geolocate control to the map.
    // map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });
    // );
  },
};
</script>
<style scoped>
#mapSection {
  height: 100vh;
  width: 100%;
}
#leftBox {
  height: 80vh;
  overflow-y: scroll;
}
</style>