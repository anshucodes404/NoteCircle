import { User } from "../models/user.model.ts";

const generateAccessAndRefreshToken = async (user: any) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  user.save();

  return { accessToken, refreshToken };
};

const registerUser = async (req: any, res: any) => {
  console.log("request received");
  const { username, name, email, password } = req.body;
  if (
    [username, name, email, password].some(
      (item) => !item || item.trim() === ""
    )
  ) {
    console.error("Every field is required");
    return res
      .status(400)
      .json({ message: "Every field is required", success: false });
  }
  console.log(req.body);

  let user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (user) {
    console.error("User already exists");
    return res.status(400).json({ message: "User already exists",  success: false });
  }

  user = await User.create({
    username,
    name,
    email,
    password,
  });

  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    console.error("User registration failed");
    return res.status(500).json({ message: "User registration failed",  success: false });
  }

  return res
    .status(200)
    .json({ user: userCreated, message: "User registered successfully", success: true });
};

const login = async (req: any, res: any) => {
  const { emailUsername, password } = req.body;
  if (!emailUsername || !password) {
    console.error("Password is required and username or email is required");
    return res.status(400).json({
      message: "Password is required and username or email is required",
      success: false,
    });
  }

  const user = await User.findOne({
    $or: [{ username: emailUsername }, { email: emailUsername }],
  });

  if (!user) {
    console.error("User not exist");
      return res.status(400).json({ message: "User not exist", success: false});
  }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
    
console.log("Access", accessToken)
console.log("refresh", refreshToken)

      const options = {
        httpOnly: true,
        secure: false, // must be false for localhost (no https)
        sameSite: "lax",
      };

      return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json({ user, message: "User logged in successfully", success: true });
};


const searchUsers = async (req: any, res: any) => {
  const { search } = req.query;
  console.log(search);
  if (!search) {
    console.error("Search is required");
    return res
      .status(400)
      .json({ success: false, message: "Username is required to Search" });
  }

  const filteredUsers = await User.find({
    $or: [
      { username: { $regex: search, $options: "i" } }, //these will create a query that searches all the names "or" usernames containing these regex
      { name: { $regex: search, $options: "i" } },
    ],
  }).select("-password -refreshToken -email -friends -__v");

  if (!filteredUsers) {
    console.error("No Users matches");
    return res
      .status(400)
      .json({ success: false, message: "No Users matched" });
  }

  return res
    .status(200)
    .json({
      users: filteredUsers,
      success: true,
      message: "Users fetched successfully",
    });
}; 


const userInfo = async (req: any, res: any) => {
  console.log(req.user)
  const userDetails = req.user
  console.log(userDetails)

  if (!userDetails) {
    console.error("User not found")
    return res.status(400).json({success: false, message: "User not found"})
  }

  const user = await User.findById(userDetails._id).select("-password -refreshToken")

  if (!user) {
    console.error("Error while searching User details")
    return res
      .status(500)
      .json({ success: false, message: "Error while searching User details" });
  }

    return res
      .status(200)
      .json({
        user,
        success: true,
        message: "User Details fetched successfully",
      });
}
export { registerUser, login, searchUsers, userInfo };
