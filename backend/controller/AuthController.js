const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const geoip = require("geoip-lite");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(404).json({ message: "Name is required" });
  }
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(404).json({ message: "Password is required" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const ip = req.ip || "127.0.0.1";
    const geo = geoip.lookup(ip);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      location: geo ? geo.country : "unknown",
    });

    await user.save();
    res.status(201).json({ message: "User successfully registered" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ token, user });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
