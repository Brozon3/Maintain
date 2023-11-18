import { signUpRoute } from "./signUpRoute.js";
import { loginRoute } from "./loginRoute.js";
import { testRoute } from "./testRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { testEmailRoute } from "./testEmailRoute.js";
import { verifyEmailRoute } from "./verifyEmailRoute.js";
import { forgotPasswordRoute } from "./forgotPasswordRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthURLRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";
import { getAllFeatures, insertFeatures } from "./featuresAndAppliances.js";
import { addProperty } from "./addPropertyRoute.js";
import { getAllUsersRoute } from "./getAllUsersRoute.js";
import { deleteUserRoute } from "./deleteUserRoute.js";
import { getAllPropertiesRoute } from "./getAllPropertiesRoute.js";
import { getAllAppliancesRoute } from "./getAllAppliancesRoute.js";
import { getAllTasksRoute } from "./getAllTasksRoute.js";
import { getPropertiesByUserRoute } from "./getPropertiesByUser.js";

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
  getAllUsersRoute,
  deleteUserRoute,
  getAllPropertiesRoute,
  getAllAppliancesRoute,
  getAllTasksRoute,
  getPropertiesByUserRoute,
];
