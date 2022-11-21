// ====================
// No need authentication
// ====================
export const PUBLIC_ROUTES = {
  default: "/",
  signup: "/signup",
  login: "/login",
  error404: "/error404",
};

// ====================
// Need authentication
// ====================
export const PRIVATE_ROUTES = {
  home: "/home",
  admin: "/admin",
  restaurants: "/restaurants",
  detail: "/detail",
  leaveComment: "/leave-comment",
  replyComment: "/reply",
  update: "/update",
  create: "/create",
  user: "/user",
  restaurant: "/restaurant",
  comment: "/comment",
  review: "/review",
};
