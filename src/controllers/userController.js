import { userService } from "../services/index.js";

const userController = {
  // @desc: Get all users
  getAllUsers: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const users = await userService.getAllUsers({ page: parseInt(page) });
      res.status(200).json({ ...users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // @desc: Get user by id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { Password, token, isActive, ..._user } = user.dataValues;
      res.status(200).json({ _user });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Get user by username
  getUserByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await userService.findByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { Password, token, isActive, ..._user } = user.dataValues;
      res.status(200).json({ _user });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Update user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        username,
        email,
        fullname,
        phoneNumber,
        address,
        roleID = 1,
      } = req.body;
      await userService.updateUser(id, {
        UserName: username,
        Email: email,
        FullName: fullname,
        PhoneNumber: phoneNumber,
        Address: address,
        RoleId: roleID,
      });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // @desc: Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get current user
  getCurrentUser: async (req, res) => {
    try {
      const id = req.decodeToken?.user?.id;
      const user = await userService.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { Password, token, isActive, ..._user } = user.dataValues;
      res.status(200).json({ _user });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
