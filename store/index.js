// import {createStore} from 'vuex'
import axios from 'axios'

let baseUrl = "https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=293919&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=km&limit=10&open_now=false&lang=en_US"

export const state = () => ({
    loader: false,
    restaurants: [],
    mylat: 0,
    mylong: 0,
    currency: 'USD',
    distance_unit: 'km',
    limit: 10,
    open_now: false,
})


export const mutations = {
    //Loading Indicator
    SET_LOADER_STATE(state, newloader) {
        state.loader = newloader
    },

    SET_RESTAURANTS(state, restaurants) {
        state.restaurants = restaurants
    },

    // Initializing Latitude and Longitude
    SET_LATITUDE(state, mylat) {
        state.mylat = mylat
    },
    SET_LONGITUDE(state, mylong) {
        state.mylong = mylong
    }
}


export const actions = {
    getLatLong({ commit }) {
        if(this.state.mylat == 0 && this.state.mylong == 0){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let mylat = position.coords.latitude;
                    let mylong = position.coords.longitude;
    
                    localStorage.setItem('mylat')
                    localStorage.setItem('mylong')

                    commit('SET_LATITUDE', mylat)
                    commit('SET_LONGITUDE', mylong)
    
                },
                (error) => {
                    console.log(error.message);
                }
            );
        }else{
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let mylat = position.coords.latitude;
                    let mylong = position.coords.longitude;
    
                    localStorage.setItem('mylat')
                    localStorage.setItem('mylong')

                    commit('SET_LATITUDE', mylat)
                    commit('SET_LONGITUDE', mylong)
    
                },
                (error) => {
                    console.log(error.message);
                }
            );
        }

    },


    getAllRestaurants({ commit }) {
       let lat = parseFloat(localStorage.getItem('mylat'));
       let long = parseFloat(localStorage.getItem('mylong'));
      
        commit('SET_LOADER_STATE', true)
        axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=' + lat + '&longitude=' + long + '&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=km&limit=10&open_now=false&lang=en_US', {
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': '8a1b68e31amsh61b19fbf46c184ap1e9200jsn02383985bb94'
            }
        }).then(data => {
            let restaurants = data.data.data
            // localStorage.setItem(restaurants)
            // console.log(data.data.data)
            commit('SET_RESTAURANTS', restaurants)
            commit('SET_LOADER_STATE', false)

        }).catch((e) => {
            console.log(e)
        })
    }
}


export const getters = {
    loader(state) {
        return state.loader
    },
    restaurants(state) {
        return state.restaurants
    },
    mylat(state) {
        return state.mylat
    },
    mylong(state) {
        return state.mylong
    }
}
