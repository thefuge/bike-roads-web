const { Router } = require('express');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const tokensRouter = Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  try {
      const { user } = res.locals;
  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ user, accessToken });
  }
  catch (error) {
    console.log(error);
  res
  .status(500)
  .json({message: error.message})
  }
});

module.exports = tokensRouter;
