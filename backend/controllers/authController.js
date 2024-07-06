const User = require('../models/User');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await User.createUser(email, password);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const login = async (req, res) => {
    console.log('Login request received:', req.body); // Add this line
    const { email, password } = req.body;
    try {
      const user = await User.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = {
  register,
  login,
};
