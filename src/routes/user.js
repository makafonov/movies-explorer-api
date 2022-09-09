const router = require('express').Router();

const { updateUser, getCurrentUserInfo } = require('../controllers/user');
const { userValidator } = require('../validators');

router.get('/me', getCurrentUserInfo);
router.patch('/me', userValidator, updateUser);

module.exports = { router };
