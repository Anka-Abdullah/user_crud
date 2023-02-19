const express = require('express');
const router = express.Router();
const {register, list, details, updatingData} = require('../controllers/user')

router.post('/register', register);
router.get('/list', list);
router.get('/:user_id', details);
router.patch('/', updatingData)

module.exports = router;
