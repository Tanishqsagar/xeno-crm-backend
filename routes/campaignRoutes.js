import express from 'express';
import {
  createCampaign,
  getCampaigns,
  getCampaignLogs
} from '../controllers/campaignController.js';

const router = express.Router();

router.post('/', createCampaign);         // Create + send campaign
router.get('/', getCampaigns);            // List all campaigns
router.get('/:id/logs', getCampaignLogs); // Get delivery logs for a campaign

export default router;
