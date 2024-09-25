const express = require('express');
const router = express.Router();
const pcController = require('../Controllers/pcController');

router.post('/pcs', pcController.createPc);

router.get('/pcs', pcController.getAllPcs);

router.get('/pc', pcController.getAllPcs);

router.get('/pcs/:id', pcController.getPcById);

router.put('/pcs/:id', pcController.updatePc);

router.delete('/pcs/:id', pcController.deletePc);

module.exports = router;