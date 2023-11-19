import { signUpRoute } from "./authRoutes/signUpRoute.js";
import { resetPasswordRoute } from "./authRoutes/resetPasswordRoute.js";
import { loginRoute } from "./authRoutes/loginRoute.js";
import { verifyEmailRoute } from "./authRoutes/verifyEmailRoute.js";
import { forgotPasswordRoute } from "./authRoutes/forgotPasswordRoute.js";
import { getGoogleOauthUrlRoute } from "./authRoutes/getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./authRoutes/googleOauthCallbackRoute.js";
import { testRoute } from "./testRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { testEmailRoute } from "./testEmailRoute.js";
import { getAllFeatures, insertFeatures } from "./featuresAndAppliances.js";
import { addProperty } from "./addPropertyRoute.js";
import { getAllUsersRoute } from "./getAllUsersRoute.js";
import { deleteUserRoute } from "./deleteUserRoute.js";
import { getAllPropertiesRoute } from "./getAllPropertiesRoute.js";
import { getAllAppliancesRoute } from "./getAllAppliancesRoute.js";
import { getAllTasksRoute } from "./getAllTasksRoute.js";

export const routes = [
  addProperty,
  testRoute,
  signUpRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
  getAllFeatures,
  insertFeatures,
  resetPasswordRoute,
  getAllUsersRoute,
  deleteUserRoute,
  getAllPropertiesRoute,
  getAllAppliancesRoute,
  getAllTasksRoute,
];
