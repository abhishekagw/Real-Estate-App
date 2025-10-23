import bcrypt from "bcrypt";

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //db operatios
  try {
    const { username, email, password } = req.body;

    //Hashed Password
    const hashedPassord = await bcrypt.hash(password, 10);
    console.log(hashedPassord);

    const newUser = new User({
      username,
      email,
      password: hashedPassord,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
    });
  }

  console.log(newUser);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check the user exits

    const user = await User.findOne({
      username: username,
    }).lean();

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    //check the password is correct

    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    //generate token and send to user
    const age = 1000 * 60 * 60 * 24 * 7;


    const token = jwt.sign(
      { id: user._id, isAdmin: false },
      process.env.JWT_KEY,
      {
        expiresIn: age,
      }
    );

    const { password: userPassword, ...userInfo } = user;

    
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successfull" });
};
