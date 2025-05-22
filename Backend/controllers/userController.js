const register = async (req, res) => {
  res.send("user register successfully");
};

const login = async (req, res) => {
  res.send("user logic successfully");
};

const logout = (req, res) => {
  res.send("user logout successfully");
};

const getProfile = (req, res) => {
  res.send("user profile");
};

export { register, login, logout, getProfile };
