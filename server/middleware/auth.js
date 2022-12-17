import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default verifyToken;
