import jwt from "jsonwebtoken";

export const verifyEmailRoute = {
  path: "/api/verifyEmail",
  method: "put",
  handler: async (req, res) => {
    const { verifycationString } = req.body;
    const db = connectToDb("Maintain");
    const result = await db.collection("users").findOne({
      verificationString,
    });

    if (!result)
      return res
        .status(401)
        .json({ message: "The email verification code is incorrect." });

    const { _id: id, email, info } = result;

    await db.collection("uers").updateOne(
      { _id: ObjectID(id) },
      {
        $set: { isVerified: True },
      }
    );

    jwt.sign(
      { id, email, isVerified: true, info },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) return res.sendStatus(500);
        res.status(200).json({ token });
      }
    );
  },
};
