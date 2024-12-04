const { Router } = require('express');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const tokensRouter = Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { user } = res.locals;
  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ user, accessToken });
});

module.exports = tokensRouter;
