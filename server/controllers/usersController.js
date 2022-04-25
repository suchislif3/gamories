import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const usersController = {
  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      checkInput(req, email, password);
      const userData = await verifyUser(email, password);
      const accessToken = createNewToken(userData);
      res.status(200).json({ result: userData, token: accessToken });
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ message: err.message || "Something went wrong." });
    }
  },

  async signUp(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    try {
      checkInput(req, email, password, name, confirmPassword);
      await checkForExistingUser(email);
      checkPasswordMatching(password, confirmPassword);
      const userData = await createNewUser(name, email, password);
      const accessToken = createNewToken(userData);
      res.status(200).json({ result: userData, token: accessToken });
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ message: err.message || "Something went wrong." });
    }
  },
};

const checkInput = (req, email, password, name, confirmPassword) => {
  if (!email && !password && !name && !confirmPassword) {
    throw { status: 400, message: "All fields are required." };
  }
  if (req.route.path === "/signup" && !name) {
    throw { status: 400, message: "Name is required." };
  }
  if (!email) {
    throw { status: 400, message: "Email is required." };
  }
  if (!password) {
    throw { status: 400, message: "Password is required." };
  }
  if (req.route.path === "/signup" && !confirmPassword) {
    throw { status: 400, message: "Password confirmation is required." };
  }
};

const verifyUser = async (email, password) => {
  const userData = await User.findOne({ email });
  let isPasswordCorrect;
  if (userData)
    isPasswordCorrect = await bcrypt.compare(password, userData?.password);
  if (!userData || !isPasswordCorrect) {
    throw { status: 400, message: "Invalid credentials." };
  }
  return userData;
};

const checkForExistingUser = async (email) => {
  const userData = await User.findOne({ email });
  if (userData) throw { status: 400, message: "User already exists." };
  return;
};

const checkPasswordMatching = (password, confirmPassword) => {
  if (password !== confirmPassword)
    throw { status: 400, message: "Passwords don't match." };
  return;
};

const createNewUser = async (name, email, password) => {
  const salt = 12;
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  return user;
};

const createNewToken = (userData) => {
  const tokenPayload = { name: userData.name, email: userData.email, userId: userData._id };
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const accessToken = jwt.sign(tokenPayload, secret, { expiresIn: "1h" });
  return accessToken;
};
