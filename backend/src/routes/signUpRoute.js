import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../util/sendEmail.js";
// import { awsUserPool } from "../util/awsUserPool.js";
import bcrypt from "bcrypt";
import { insertUser, getUserByEmail } from "../Commands.js";
// import { DocumentClient } from "../Commands"

// Temp import for basic setup. Remove bcrypt from dependencies when finished

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(409).json({ message: "User already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid();

    // Do we want to include any starting info with out users?

    // const startingInfo = {
    //   hairColor: "test",
    //   favoriteFood: "test",
    //   bio: "test",
    // };

    //Create a unique numeric ID
    const standardUUID = uuid();
    const numericRepresentation = BigInt("0x" + standardUUID.replace(/-/g, ""));
    const userID = Number(numericRepresentation);

    // info: startingInfo,
    const result = await insertUser({
      userID,
      email,
      passwordHash,
      isVerified: "false",
      verificationString,
    });

    const { insertedId } = result;

    // try {
    //   await sendEmail({
    //     to: email,
    //     from: "saxdevchris@gmail.com",
    //     subject: "Please verify your email",
    //     text: `
    //   Thanks for signingup! To verify your mail, click here:
    //   http://localhost:3000/verify-email/${verificationString}
    // `,
    //   });
    // } catch (e) {
    //   console.log(e);
    //   res.sendStatus(500);
    // }

    jwt.sign(
      {
        id: insertedId,
        email,
        // info: startingInfo,
        //TODO Change back to false
        isVerified: true,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
