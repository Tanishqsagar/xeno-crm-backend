import express from 'express';
import { deliveryReceipt } from '../controllers/vendorController.js';

const router = express.Router();

router.post('/receipt', deliveryReceipt); // POST /api/vendor/receipt

export default router;
