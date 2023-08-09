const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsContoller')

router.post('/create', questionsController.createQst);
router.get('/:id', questionsController.getQst)
router.post('/:id/options/create', questionsController.createOpt);
router.delete('/:id/delete', questionsController.deleteQst);

module.exports = router;