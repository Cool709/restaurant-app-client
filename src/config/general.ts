export const BACKEND_BASE_URL = "http://192.168.111.138:5000";

export const APIs = {
  // auth
  REGISTER_API: BACKEND_BASE_URL + "/user",
  LOGIN_API: BACKEND_BASE_URL + "/login",
  // Image
  USER_IMAGE_API: BACKEND_BASE_URL + "/image/user/", // + id
  RESTAURANT_IMAGE_API: BACKEND_BASE_URL + "/image/restaurant/", // + id
  // upload
  UPLOAD_USER_IMAGE_API: BACKEND_BASE_URL + "/upload/user/", // + id
  UPLOAD_RESTAURANT_IMAGE_API: BACKEND_BASE_URL + "/upload/restaurant/", // + id
  // Restaurants
  GET_RESTAURANTS: BACKEND_BASE_URL + "/restaurants",
  CREATE_RESTAURANT: BACKEND_BASE_URL + "/restaurants", // post
  UPDATE_RESTAURANT: BACKEND_BASE_URL + "/restaurants/", // put + id
  DELETE_RESTAURANT: BACKEND_BASE_URL + "/restaurants/", // delete + id
  GET_RESTAURANT_BY_ID: BACKEND_BASE_URL + "/restaurants/", // + id,
  GET_RESTAURANTS_BY_RATE: BACKEND_BASE_URL + "/restaurants/search/rate",
  GET_RESTAURANTS_BY_OWNER: BACKEND_BASE_URL + "/restaurants/search/owner",
  GET_RESTAURANTS_WAITING_LIST:
    BACKEND_BASE_URL + "/restaurants/search/waiting-reply",
  // Comments
  LEAVE_COMMENT: BACKEND_BASE_URL + "/comments", // post
  GET_COMMENT_BY_ID: BACKEND_BASE_URL + "/comments/", // + id
  // Review
  CREATE_REVIEW: BACKEND_BASE_URL + "/reviews", //post
};
