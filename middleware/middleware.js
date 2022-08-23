const jwt = require('jsonwebtoken');
const User = require('../modals/modals');

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.authtoken;
    if (token) {
      const verifyToken = jwt.verify(token, process.env.TOKEN);

      const verifiedUser = await User.findOne({
        _id: verifyToken._id,
        'tokens["token"]': token,
      }).select({ tokens: 0, __v: 0 });

      if (!verifiedUser) {
        req.msg = 'error';
      } else {
        req.token = token;
        req.Data = verifiedUser;
        req.userID = verifiedUser._id;
      }
    } else {
      req.msg = 'error';
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = Authenticate;
