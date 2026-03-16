const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.USER &&
    password === process.env.PASSWORD
  ) {
    const token = jwt.sign(
      { user: "shared" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Welcome back!",
      token
    });
  }

  res.status(401).json({
    message: "Invalid credentials"
  });
};