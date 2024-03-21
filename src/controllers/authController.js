import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import cookie from "cookie";
import {
  jwtService,
  userService,
  validateData,
  mailService,
} from "../services/index.js";

const authController = {
  // @desc: Register a new user
  register: async (req, res) => {
    try {
      const { email, password, fullname, phoneNumber } = req.body;
      const validate = validateData.registerData({
        email,
        password,
        fullname,
        phoneNumber,
      });

      if (validate) {
        return res.status(400).json(validate);
      }

      const exitEmail = await userService.findByEmail(email);
      if (exitEmail) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      const activeToken = uuidv4();
      const isSent = await mailService.sendActiveToken(email, activeToken);
      if (!isSent) {
        return res.status(400).json({ message: "Email không hoạt động" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await userService.createUser({
        Password: hashedPassword,
        Email: email,
        FullName: fullname,
        PhoneNumber: phoneNumber,
        token: { activeToken },
      });

      const { Password, token, isActive, updatedAt, createdAt, ...user } =
        newUser.dataValues;

      res.status(201).json({ message: "Register successfully", user: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // @desc: Login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!validateData.isEmail(email)) {
        return res.status(400).json({ message: "Email không hợp lệ" });
      }
      if (!validateData.isPassword(password)) {
        return res.status(400).json({ message: "Mật khẩu không hợp lệ" });
      }
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }
      if (!user.isActive) {
        return res.status(400).json({ message: "Người dùng chưa được kích hoạt" });
      }
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }
      if (user && isMatch) {
        const payload = {
          user: {
            id: user.id,
          },
        };

        // Create token
        const accessToken = jwtService.generateAccessToken(payload);

        const refreshToken = jwtService.generateRefreshToken(payload);

        // Set cookie
        const accessCookie = cookie.serialize(
          "a3f24f4a11fd0135627ddd8ab9f40cbe",
          accessToken,
          {
            maxAge: 60, // 1min
            httpOnly: true, // for security
            sameSite: "lax", // csrf
            secure: true, // for https
            path: "/",
          }
        );

        // Set cookie
        const refreshCookie = cookie.serialize(
          "65f9c2d174ff38ead38339d7dec2389c",
          refreshToken,
          {
            maxAge: 7 * 24 * 60 * 60, // 7d
            httpOnly: true, // for security
            sameSite: "lax", // csrf
            secure: true, // for https
            path: "/",
          }
        );

        // Create a device id cookie;
        const deviceCookie = cookie.serialize("_fr_device", uuidv4(), {
          maxAge: 7 * 24 * 60 * 60,
          sameSite: "lax",
          secure: true, // for https
          path: "/",
        });

        await res.setHeader("Set-Cookie", [
          accessCookie,
          refreshCookie,
          deviceCookie,
        ]);
        res.status(200).json({ message: "Login successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // login with
  loginSocialMedia: async (req, res) => {
    try {
      const profile = req.user;
      let payload = null;
      if (!profile) {
        return res.status(500).json({ message: "Profile does not exist" });
      }
      const user = await userService.findByEmail(profile?.emails[0]?.value);
      if (!user) {
        const userDB = await userService.createUser({
          UserName: profile?.emails[0]?.value
            ? profile?.emails[0]?.value
            : profile?.id,
          Email: profile?.emails[0]?.value
            ? profile?.emails[0]?.value
            : profile?.id,
          FullName: profile?.displayName,
          Password: null,
          PhoneNumber: null,
          loginWith: profile?.provider,
          socialLoginId: profile?.id,
        });
        payload = {
          user: {
            id: userDB.id,
            username: userDB.UserName,
          },
        };
      } else {
        payload = {
          user: {
            id: user.id,
            username: user.UserName,
          },
        };
      }

      const refreshToken = jwtService.generateRefreshToken(payload);
      const accessToken = jwtService.generateAccessToken(payload);
      // Set cookie
      const accessCookie = cookie.serialize(
        "a3f24f4a11fd0135627ddd8ab9f40cbe",
        accessToken,
        {
          maxAge: 60, // 1min
          httpOnly: true, // for security
          sameSite: "lax", // csrf
          secure: true, // for https
          path: "/",
        }
      );

      // Set cookie
      const refreshCookie = cookie.serialize(
        "65f9c2d174ff38ead38339d7dec2389c",
        refreshToken,
        {
          maxAge: 7 * 24 * 60 * 60, // 7d
          httpOnly: true, // for security
          sameSite: "lax", // csrf
          secure: true, // for https
          path: "/",
        }
      );

      // Create a device id cookie;
      const deviceCookie = cookie.serialize("_fr_device", uuidv4(), {
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "lax",
        secure: true, // for https
        path: "/",
      });

      await res.setHeader("Set-Cookie", [
        accessCookie,
        refreshCookie,
        deviceCookie,
      ]);
      return res.redirect(process.env.FRONTEND_URL);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Logout user
  logout: async (req, res) => {
    try {
      const accessCookie = cookie.serialize(
        "a3f24f4a11fd0135627ddd8ab9f40cbe",
        "",
        {
          maxAge: -1,
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          path: "/",
        }
      );

      const refreshCookie = cookie.serialize(
        "65f9c2d174ff38ead38339d7dec2389c",
        "",
        {
          maxAge: -1,
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          path: "/",
        }
      );

      const deviceCookie = cookie.serialize("_fr_device", "", {
        maxAge: -1,
        sameSite: "lax",
        secure: true,
        path: "/",
      });

      await res.setHeader("Set-Cookie", [
        accessCookie,
        refreshCookie,
        deviceCookie,
      ]);
      res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Refresh token
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies["65f9c2d174ff38ead38339d7dec2389c"];
      if (!refreshToken) {
        return res
          .status(401)
          .json({ message: "Unauthorized", redirect: "login" });
      }
      const payload = jwtService.verifyRefreshToken(refreshToken);
      if (!payload) {
        return res
          .status(401)
          .json({ message: "Unauthorized", redirect: "login" });
      }
      const user = await userService.findById(payload.user.id);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized", redirect: "login" });
      }
      const newPayload = {
        user: {
          id: user.id,
          email: user.Email,
        },
      };
      const accessToken = jwtService.generateAccessToken(newPayload);
      const accessCookie = cookie.serialize(
        "a3f24f4a11fd0135627ddd8ab9f40cbe",
        accessToken,
        {
          maxAge: 60, // 1min
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          path: "/",
        }
      );
      await res.setHeader("Set-Cookie", [accessCookie]);
      res.status(200).json({ message: "Refresh token successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Active account
  activeAccount: async (req, res) => {
    try {
      const { email, token } = req.query;
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "User does not exit" });
      }
      if (user.isActive) {
        return res.status(400).json({ message: "Account has been activated" });
      }
      if (user?.token?.activeToken !== token) {
        return res.status(400).json({ message: "Invalid token" });
      }
      await userService.activeUser(user.id);
      return res.status(200).json({ message: "Activated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Forgot password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Email does not exist" });
      }
      if (!user.isActive) {
        return res
          .status(400)
          .json({ message: "Account has not been activated" });
      }
      const resetPasswordToken = uuidv4();
      await userService.updateResetPasswordToken(user.id, resetPasswordToken);
      const isSent = await mailService.sendResetPasswordToken(
        email,
        resetPasswordToken
      );
      if (!isSent) {
        return res.status(400).json({ message: "Sent email fail" });
      }
      return res.status(200).json({ message: "Sent email successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // @desc: Verify reset password token
  generateTempPassword: async (req, res) => {
    try {
      const { email, token } = req.query;
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "User does not exit" });
      }
      if (user?.token?.resetPasswordToken !== token) {
        return res.status(400).json({ message: "Invalid token" });
      }
      const updatePassword = await userService.updateRandomPassword(user.id);
      return res.status(200).json({
        message: "Generated temp password successfully",
        tempPassword: updatePassword,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Change password
  changePassword: async (req, res) => {
    try {
      const { username, password, newPassword } = req.body;
      const user = await userService.findByUsername(username);
      if (!user) {
        return res.status(400).json({ message: "User does not exit" });
      }
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password is incorrect" });
      }
      const isSame = await bcrypt.compare(newPassword, user.Password);
      if (isSame) {
        return res
          .status(400)
          .json({ message: "New password is the same as old password" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatePassword = await userService.changePassword(
        user,
        hashedPassword
      );
      if (updatePassword)
        return res
          .status(200)
          .json({ message: "Change password successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  cancelIsActive: async (req, res, next) => {
    try {
      const id = req.decodeToken?.user?.id
      const user = await userService.cancelIsActive(id);
      if (user) {
        next()
      }
      else {
        return res
        .status(400)
        .json({ message: "Delete user failed" });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
