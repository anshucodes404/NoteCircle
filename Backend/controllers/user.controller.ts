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
        secure: true,
      };

      return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json({ user, message: "User logged in successfully", success: true });
};

export { registerUser, login };
