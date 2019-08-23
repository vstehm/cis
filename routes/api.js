var express = require('express');
const helper = require('../helpers/helper');
const userController = require('../controllers/api/user');
var router = express.Router();


/* GET user. */
router.get('/:id', userController.getUserById);

/* GET user avatar. */
router.get('/:id/avatar', userController.getAvatarByUserId);

/* DELETE user avatar. */
router.delete('/:id/avatar', userController.deleteAvatarByUserId);

module.exports = router;
