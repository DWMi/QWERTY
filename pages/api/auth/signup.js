import User from "../../../models/User";
import db from "../../../utils/db";

async function handler(rew, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, firstName, lastName, address, password } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !firstName ||
    !lastName ||
    !address ||
    !password ||
    password.trim.length < 5
  ) {
    res.status(422).json({
      message: "Validation error!",
    });
    return;
  }
  await db.connect();
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "Account already registered!" });
    await db.disconnect();
    return;
  }
}

export default handler;
