import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/post.js';
import verifyToken from '../middleware/auth.js';

const postRoute = express.Router();

// Read
postRoute.get('/', verifyToken, getFeedPosts);
postRoute.get('/:userId/posts', verifyToken, getUserPosts);

// Update
postRoute.patch('/:id/like', verifyToken, likePost);

export default postRoute;