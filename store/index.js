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
    open_now: true,
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
    },

    SET_OPENED_NOW(state, open_now){
        state.open_now = open_now
    },

    SET_DISTANCE(state, limit){
        state.limit = limit
    }
}


export const actions = {
    getLatLong({ commit }) {
        if(this.state.mylat == 0 && this.state.mylong == 0){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let mylat = position.coords.latitude;
                    let mylong = position.coords.longitude;
    
                    localStorage.setItem('mylat',mylat)
                    localStorage.setItem('mylong', mylong)

                    commit('SET_LATITUDE', mylat)
                    commit('SET_LONGITUDE', mylong)

                    // console.log(mylong)
    
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
    
                    localStorage.setItem('mylat',mylat)
                    localStorage.setItem('mylong', mylong)

                    commit('SET_LATITUDE', mylat)
                    commit('SET_LONGITUDE', mylong)

                    console.log(mylong)

    
                },
                (error) => {
                    console.log(error.message);
                }
            );
        }

    },


    getAllRestaurants({ commit , dispatch }) {
       let lat = parseFloat(localStorage.getItem('mylat'));
       let long = parseFloat(localStorage.getItem('mylong'));
      
        commit('SET_LOADER_STATE', true)
        axios.get('https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=' + lat + '&longitude=' + long + '&currency=USD&lunit=km&limit='+ this.state.limit +'&open_now='+ this.state.open_now +'&lang=en_US', {
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

            // Refreshing mylat and long
            dispatch('getLatLong');


        }).catch((e) => {
            console.log(e)
        })
    },

    setOpenedNow({ commit , dispatch}){
        if( this.state.open_now == true ){
            let open_now = false
            commit('SET_OPENED_NOW',open_now)
            dispatch('getAllRestaurants');
            
        }else{
            let open_now = true
            commit('SET_OPENED_NOW',open_now)
            dispatch('getAllRestaurants');
        }
    },

    distance({ commit, dispatch }, { km }){
        let limit = km
        commit('SET_DISTANCE',limit)
        dispatch('getAllRestaurants');
    }
}


export const getters = {
    limit(state){
        return state.limit
    },
    open_now(state){
        return state.open_now
    },
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
