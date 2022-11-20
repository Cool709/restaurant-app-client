export const BACKEND_BASE_URL = "https://sea-lion-app-6rs9n.ondigitalocean.app";

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
  GET_COMMENTS: BACKEND_BASE_URL + "/comments", // get
  LEAVE_COMMENT: BACKEND_BASE_URL + "/comments", // post
  GET_COMMENT_BY_ID: BACKEND_BASE_URL + "/comments/", // + id
  UPDATE_COMMENT: BACKEND_BASE_URL + "/comments/", // + id put
  DELETE_COMMENT: BACKEND_BASE_URL + "/comments/", // + id delete
  // Review
  CREATE_REVIEW: BACKEND_BASE_URL + "/reviews", //post
  UPDATE_REVIEW: BACKEND_BASE_URL + "/reviews/", //put + id
  DELETE_REVIEW: BACKEND_BASE_URL + "/reviews/", //delete + id
  // users
  GET_USERS: BACKEND_BASE_URL + "/user",
  GET_USER_BY_ID: BACKEND_BASE_URL + "/user/", // + id
  CREATE_USER: BACKEND_BASE_URL + "/user/", // post
  UPDATE_USER: BACKEND_BASE_URL + "/user/", // put
  DELETE_USER: BACKEND_BASE_URL + "/user/", // delete
};
