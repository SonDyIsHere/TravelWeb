
import axios from 'axios';

// const BASE_URL = 'https://sonduy.pythonanywhere.com';
const BASE_URL = 'http://127.0.0.1:8000/';

export const endpoints = {
   'destinations': '/destinations/',
   'destinationsDetail': (destinationId) => `/destinations/${destinationId}/`,
   'places': (destinationId) => `/destinations/${destinationId}/get_place/`,
   'placesDetail' : (placeId, destinationId) => `/destinations/${destinationId}/places/${placeId}/`,
    // 'trips': '/trips/',
    // 'add_trip':'/trips/add_trip/',
    // 'tripsDetail': (tripId) => `/trips/${tripId}/`,
    // 'comments': (tripId) => `/trips/${tripId}/get_comments/`,
    // 'postComment': (tripId) => `/trips/${tripId}/comments/`,
    // 'getTripOwner': (userId) => `/users/${userId}/get_trips/`,
    'register': '/users/',
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    // 'placeDetail': (placeID) => `/places/${placeID}/`,
    // 'like': (tripId) => `/trips/${tripId}/like/`,
    // 'check_liked' : (tripId) => `/trips/${tripId}/check_liked/`,
    // 'ratings' :(tripId) => `/trips/${tripId}/ratings/`,
    // 'report': (userId) => `/users/${userId}/report/`,
    // 'delete_comment': (tripId, commentId) => `/trips/${tripId}/comments/${commentId}/delete/`,
    // 'delete_place': (tripId, placeId) => `/trips/${tripId}/places/${placeId}/delete/`,
    // 'delete_rating': (tripId, ratingId) => `/trips/${tripId}/ratings/${ratingId}/delete/`,
    // 'edit_comment' : (tripId, commentId) => `/trips/${tripId}/comments/${commentId}/partial-update/`,
    // 'edit_place' : (tripId, placeId) => `/trips/${tripId}/places/${placeId}/partial-update/`,
    // 'addPlace': (tripId) => `/trips/${tripId}/places/`,
    // 'hide_trip': (tripId) => `/trips/${tripId}/hide-trip/`,
    // 'account_list': `users/user_reported/`,
    // 'block_account': (userId) => `users/${userId}/block_account/`,
    // 'update_trip' : (tripId) => `/trips/${tripId}/`
};

const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});


//Xác thực người dùng 
export const authAPI = (accessToken) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${accessToken}`
            // 'Authorization': `Bearer ${accessToken}`
        }
    });
}

export default APIs;
