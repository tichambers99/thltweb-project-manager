const express = require('express');
const router = express.Router();
var UserController = require('../controllers/UserController');

router.post('/edit', UserController.editInfor)
router.get('/edit', UserController.viewEditInfor)
router.get('/', UserController.view)

module.exports = router;