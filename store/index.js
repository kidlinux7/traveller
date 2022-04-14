// import {createStore} from 'vuex'
import axios from 'axios'

let baseUrl = "https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=293919&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=km&limit=10&open_now=false&lang=en_US"

export const state = () => ({
    loader: false,
    restaurants: [],
})


export const mutations = {
    //Loading Indicator
    SET_LOADER_STATE(state, newloader) {
        state.loader = newloader
    },

    SET_RESTAURANTS(state, restaurants) {
        state.restaurants = restaurants
    }
}


export const actions = {
    getAllRestaurants({ commit }) {
        commit('SET_LOADER_STATE', true)
        axios.get(baseUrl, {
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': '8a1b68e31amsh61b19fbf46c184ap1e9200jsn02383985bb94'
            }
        }).then(data => {
            let restaurants = data.data.data
            // localStorage.setItem(restaurants)
            console.log(data.data.data)
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
    }
}
