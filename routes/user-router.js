const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.use(express.static('./client/public'));
router.get('/', UserCtrl.getHome)
router.post('/user', UserCtrl.createUser);
router.post('/', UserCtrl.createUser2);
router.put('/user/:id', UserCtrl.updateUser);
router.put('/', UserCtrl.updateUser2);
router.delete('/user/:id', UserCtrl.deleteUser);
router.delete('/', UserCtrl.deleteUser2);
router.get('/user/:id', UserCtrl.getUserById);
router.get('/users', UserCtrl.getUsers);

module.exports = router;