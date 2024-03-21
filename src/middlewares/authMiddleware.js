import dotenv from "dotenv";
import { validate as uuidValidate } from "uuid";
import cookie from "cookie";
import { jwtService, roleService } from "../services/index.js";
dotenv.config();

const authMiddleware = {
  checkToken: async (req, res, next) => {
    try {
      const deviceId = req.cookies["_fr_device"];
      if (!deviceId || !uuidValidate(deviceId)) {
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
        return res
          .status(401)
          .json({ message: "Unauthorized", redirect: "login" });
      }
      const accessToken = req.cookies["a3f24f4a11fd0135627ddd8ab9f40cbe"];
      const refreshToken = req.cookies["65f9c2d174ff38ead38339d7dec2389c"];

      const checkRefreshToken = jwtService.verifyRefreshToken(refreshToken);
      if (!checkRefreshToken) {
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
        return res
          .status(401)
          .json({ message: "Unauthorized", redirect: "login" });
      }

      if (!accessToken && !refreshToken) {
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
        return res
          .status(401)
          .json({ message: "Unauthorized", redirect: "login" });
      }
      if (!accessToken && refreshToken) {
        return res.status(401).json({ message: "Try refreshtoken" });
      }

      try {
        const decoded = jwtService.verifyAccessToken(accessToken);
        if (!decoded) {
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
          return res
            .status(401)
            .json({ message: "Unauthorized", redirect: "login" });
        }
        req.decodeToken = decoded;
        next();
      } catch (error) {
        // token expired
        if (
          error.name === "TokenExpiredError" &&
          error.message === "jwt expired"
        ) {
          return res.status(401).json({ message: "Access token expired" });
        }
        if (error.name === "JsonWebTokenError") {
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
          return res
            .status(401)
            .json({ error: "Invalid access token", redirect: "login" });
        }
        throw error;
      }
    } catch (error) {
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
      return res.status(401).json({
        message: "Unauthorized",
        redirect: "login",
      });
    }
  },
  checkAdmin: async (req, res, next) => {
    try {
      const id = req.decodeToken?.user?.id;
      const admin = await roleService.checkAdminRole(id);
      if (!admin) {
        return res
          .status(403)
          .json({ message: "Forbidden", redirect: "login" });
      }
      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authMiddleware;
