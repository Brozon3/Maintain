import { signUpRoute } from "./authRoutes/signUpRoute.js";
import { oAuthConfig } from "./authRoutes/oAuthConfigRoute.js";
import { resetPasswordRoute } from "./authRoutes/resetPasswordRoute.js";
import { loginRoute } from "./authRoutes/loginRoute.js";
import { verifyEmailRoute } from "./authRoutes/verifyEmailRoute.js";
import { forgotPasswordRoute } from "./authRoutes/forgotPasswordRoute.js";
import { getGoogleOauthUrlRoute } from "./authRoutes/getGoogleOauthUrlRoute.js";
import { googleOauthCallbackRoute } from "./authRoutes/googleOauthCallbackRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { addProperty } from "./addPropertyRoute.js";
import { getPropertiesByUser } from "./getPropertiesByUserRoute.js";
import { deleteUserProperty } from "./deletePropertyRoute.js";
import { getPropertyByIDRoute } from "./getPropertyByIDRoute.js";
import { getPropertyTasksRoute } from "./getPropertyTasksRoute.js";
import { getPropertyAppliancesRoute } from "./getPropertyAppliancesRoute.js";
import { addTask } from "./addTaskRoute.js";
import { getApplianceTypesRoute } from "./getApplianceTypesRoute.js";
import { addApplianceRoute } from "./addApplianceRoute.js";
import { updateTaskRoute } from "./updateTaskRoute.js";
import { deleteApplianceRoute } from "./deleteApplianceRoute.js";
import { getPropertyFeaturesRoute } from "./getPropertyFeaturesRoute.js"
import { listCalendarEvents } from "./listCalendarEventsRoute.js"
import { updateFeaturesRoute } from "./updateFeaturesRoute.js"

export const routes = [
  addProperty,
  signUpRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
  resetPasswordRoute,
  getPropertiesByUser,
  oAuthConfig,
  deleteUserProperty,
  getPropertyByIDRoute,
  getPropertyTasksRoute,
  getPropertyAppliancesRoute,
  addTask,
  getApplianceTypesRoute,
  addApplianceRoute,
  updateTaskRoute,
  deleteApplianceRoute,
  getPropertyFeaturesRoute,
  listCalendarEvents,
  updateFeaturesRoute,
];
