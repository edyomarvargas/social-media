import User from '../models/User.js';

// Read
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const friends = await Promise.all(
      user.friends.map((_id) => User.findById(_id)),
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => (
        {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        }
      ),
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    if (!user || !friend) return res.status(404).json({ message: 'User not found' });

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((_id) => _id !== friendId);
      friend.friends = friend.friends.filter((_id) => _id !== id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((_id) => User.findById(_id)),
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => (
        { _id, firstName, lastName, occupation, location, picturePath }
      ),
    );

    return res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {
  getUser,
  getUserFriends,
  addRemoveFriend,
};