const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController.js');

router.get('/', UserController.getUsers);
router.get('/:name', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/:name', UserController.updateUser);
router.delete('/:name', UserController.deleteUser);

module.exports = userRouter;
