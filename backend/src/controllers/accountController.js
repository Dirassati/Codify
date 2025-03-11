const {
  createAccount,
  modifyAccount,
  deactivate_Account,
  activate_Account,
  authenticateUser,
} = require("../services/accountService");

const register = async (req, res) => {
  const { email, matricule, password, user_role, ...roleData } = req.body;

  // Validate input
  if (!email && !matricule) {
    return res.status(400).json({ message: "Email or matricule is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!user_role) {
    return res.status(400).json({ message: "Role is required" });
  }

  try {
    const user = await createAccount(
      email,
      matricule,
      password,
      user_role,
      roleData
    );
    res.status(201).json({
      message: "Account created successfully",
      user, // Return the created user
    });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: "Email or matricule already exists" });
    }

    if (err.message === "Parent ID does not exist") {
      return res.status(400).json({ message: "Parent ID does not exist" });
    }

    res.status(500).json({ message: "Error creating account" });
  }
};

const updateAccount = async (req, res) => {
  console.log("Update Account Route Hit");
  const { id } = req.params; // User ID to update
  const { email, password, ...roleData } = req.body;

  // Validate input
  if (!email && !password && !roleData) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    const updatedUser = await modifyAccount(id, email, password, roleData);
    res.status(200).json({
      message: "Account updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);

    if (err.message === "Email already exists") {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (err.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Error updating account" });
  }
};

const deactivateAccount = async (req, res) => {
  console.log("Request Params:", req.params);
  const { id } = req.params; // Extract the id from req.params

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    console.log("Deactivate Account: Deactivating account for", id);
    const user = await deactivate_Account(id);
    console.log("Deactivate Account: Account deactivated successfully for", id);
    res.status(200).json({
      message: "Account deactivated successfully",
      user, // Return the updated user
    });
  } catch (err) {
    console.error("Deactivate Account Error:", err);

    if (err.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Error deactivating account" });
  }
};

const activateAccount = async (req, res) => {
  const { id } = req.params; // User ID to activate

  try {
    const user = await activate_Account(id);
    res.status(200).json({
      message: "Account activated successfully",
      user, // Return the updated user
    });
  } catch (err) {
    console.error(err);

    if (err.message === "User not found") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(500).json({ message: "Error activating account" });
  }
};



module.exports = {
  register,
  updateAccount,
  deactivateAccount,
  activateAccount,
};
