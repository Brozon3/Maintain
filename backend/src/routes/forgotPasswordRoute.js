import { v4 as uuid } from "uuid";
// import { sendEmail } from "../util/sendEmail";
import { forgotPasswordCode } from "../Commands.js";

export const forgotPasswordRoute = {
  path: "/api/forgotPassword/:email",
  method: "put",
  handler: async (req, res) => {
    const { email } = req.params;

    const passwordResetCode = uuid();

    const { result } = await forgotPasswordCode(email, passwordResetCode);

    // Not quite correct syntax, but this will change.
    if (result) {
      //   try {
      //     await sendEmail({
      //       to: email,
      //       from: "saxdevchris@gmail.com",
      //       subject: "Password Reset",
      //       text: `To reset your password, click this link:
      //                 http.......`,
      //     });
      //   } catch (e) {
      //     console.log(e);
      //     res.sendStatus(500);
      //   }
    }
    res.sendStatus(200);
  },
};
