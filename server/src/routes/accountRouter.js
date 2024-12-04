const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const accountRouter = express.Router();

accountRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Заполни все поля' });
  }

  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, password: await bcrypt.hash(password, 10) },
  });

  if (!created) {
    return res
      .status(400)
      .json({ message: 'Такой пользователь уже существует' });
  }

  const user = newUser.get();
  delete user.password;
  delete user.createdAt;

  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ user, accessToken });
});

accountRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Заполни все поля' });
  }

  const targetUser = await User.findOne({ where: { email } });
  if (!targetUser) return res.status(400).json({ message: 'Ошибка входа' });

  const isPasswordValid = await bcrypt.compare(password, targetUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Ошибка входа' });
  }

  const user = targetUser.get();
  delete user.password;
  delete user.createdAt;

  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ user, accessToken });
});

accountRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = accountRouter;
