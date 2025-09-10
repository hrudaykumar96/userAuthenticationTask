const bcrypt = require("bcryptjs");
const User = require("./users.models");
const { sendEmail } = require("../../utils/email");
const { encryptData, decryptData } = require("../../utils/encryption");
const { generateOTP } = require("../../utils/otp");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: encryptData(email) });

    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const otp = generateOTP();

    const user = new User({
      name: encryptData(name),
      email: encryptData(email),
      password: hashedPassword,
      emailOtp: otp,
      emailOtpExpires: Date.now() + 10 * 60 * 1000,
    });

    await user.save();

    await sendEmail(
      email,
      "Confirm your email",
      `Your OTP is ${otp}`,
      `<p>Hello ${name},</p><p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`
    );
    res
      .status(200)
      .json({ success: "User registered. Please check your email for OTP." });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function verifyEmail(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: encryptData(email) });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (
      !user.emailOtp ||
      user.emailOtp !== otp ||
      user.emailOtpExpires < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.emailConfirmed = true;
    user.emailOtp = null;
    user.emailOtpExpires = null;
    await user.save();

    res.json({ success: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const encryptedEmail = encryptData(email);
    const user = await User.findOne({ email: encryptedEmail });

    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });
    if (!user.emailConfirmed)
      return res.status(400).json({ error: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const otp = generateOTP();

    user.emailOtp = otp;
    user.emailOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const decryptname = decryptData(user.name);
    await sendEmail(
      email,
      "Confirm your email",
      `Your OTP is ${otp}`,
      `<p>Hello ${decryptname},</p><p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`
    );

    res.status(200).json({ success: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function verifyLogin(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: encryptData(email) });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (
      !user.emailOtp ||
      user.emailOtp !== otp ||
      user.emailOtpExpires < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.emailOtp = null;
    user.emailOtpExpires = null;
    await user.save();

    req.session.userId = user._id;

    res.json({ success: "Email verified successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function loginuser(req, res) {
  try {
    const user = req.user;
    return res.status(200).json({ success: user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function logoutUser(req, res) {
  try {
    if (req.session && req.session.userId) {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Could not log out. Try again." });
        }
        res.clearCookie("connect.sid");
        return res.json({ success: "Logged out successfully" });
      });
    } else {
      return res.status(400).json({ error: "User not logged in" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function updateUserData(req, res) {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!req.session && !req.session.userId)
      return res.status(404).json({ error: "Session not found" });

    const usertoUpdate = await User.findById(req.session.userId);
    if (!usertoUpdate) return res.status(404).json({ error: "User not found" });

    if (!usertoUpdate.emailConfirmed)
      return res.status(400).json({ error: "Email not verified" });

    const { name, email, password } = req.body;

    if (name) usertoUpdate.name = encryptData(name);
    if (email) {
      const existingUser = await User.findOne({ email: encryptData(email) });
      if (
        existingUser &&
        existingUser._id &&
        existingUser._id.toString() !== usertoUpdate._id.toString()
      ) {
        return res.status(400).json({ error: "Email already in use" });
      }
      usertoUpdate.email = encryptData(email);
    }
    if (password) usertoUpdate.password = await bcrypt.hash(password, 12);

    await usertoUpdate.save();

    return res.json({ success: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function forgotpassword(req, res) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: encryptData(email) });

    if (!user) return res.status(400).json({ error: "Email not registered" });

    const otp = generateOTP();

    user.emailOtp = otp;
    user.emailOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    return res.status(200).json({ success: "OTP send successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function verifyforgotpassword(req, res) {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email: encryptData(email) });

    if (!user) return res.status(400).json({ error: "Email not registered" });

    if (
      !user.emailOtp ||
      user.emailOtp !== otp ||
      user.emailOtpExpires < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.emailOtp = null;
    user.emailOtpExpires = null;
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ success: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  register,
  verifyEmail,
  verifyLogin,
  login,
  loginuser,
  logoutUser,
  updateUserData,
  verifyforgotpassword,
  forgotpassword,
};
