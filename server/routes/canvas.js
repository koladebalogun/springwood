const express = require('express');
const {saveDrawing, getDrawing} = require('../controllers/canvasController');

const router = express.Router();

router.post('/canvas', saveDrawing);
router.get('/canvas/:userId', getDrawing);

module.exports = router;
