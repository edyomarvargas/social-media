import express from 'express';
import verifyToken from '../middleware/auth.js';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';

const usersRoute = express.Router();

// Read
usersRoute.get('/:id', verifyToken, getUser);
usersRoute.get('/:id/friends', verifyToken, getUserFriends);

// Update
usersRoute.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default usersRoute;