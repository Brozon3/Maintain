import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../commands/users.js";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    const result = await getUserByEmail(email);

    const user = result[0];

    if (!user) return res.sendStatus(401);

    const { userID, is_verified, passwordHash, max_properties } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      jwt.sign(
        { id, isVerified, email, info },
        process.env.JWT_SECRET,
        { expiresIn: "2d" },
        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }
          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
