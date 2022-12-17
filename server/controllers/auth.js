import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Register user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password,
      picturePath, friends, location, occupation } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, 
      picturePath,
      friends,
      location,
      occupation, 
      viewedProfile: Math.floor(Math.randon() * 1000),
      impressions: Math.floor(Math.randon() * 1000),
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default register;