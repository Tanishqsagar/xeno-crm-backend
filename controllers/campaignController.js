import Campaign from '../models/Campaign.js';
import Customer from '../models/Customer.js';
import CommunicationLog from '../models/CommunicationLog.js';

const applyRule = (customer, rule) => {
  const { field, op, value } = rule;
  const fieldValue = customer[field];

  switch (op) {
    case '>': return fieldValue > value;
    case '<': return fieldValue < value;
    case '>=': return fieldValue >= value;
    case '<=': return fieldValue <= value;
    case '==': return fieldValue == value;
    case '!=': return fieldValue != value;
    default: return false;
  }
};

const filterCustomers = (customers, rules) => {
  return customers.filter(customer =>
    rules.every(rule => applyRule(customer, rule))
  );
};

export const createCampaign = async (req, res) => {
  try {
    const { name, rules } = req.body;

    // Get all customers
    const customers = await Customer.find();
    const matched = filterCustomers(customers, rules);

    // Save campaign
    const campaign = await Campaign.create({
      name,
      rules,
      audienceSize: matched.length,
    });

    // Simulate message sending (90% success)
    const logs = matched.map(customer => {
      const isSent = Math.random() < 0.9;
      const message = `Hi ${customer.name}, here's 10% off on your next order!`;
      return {
        campaignId: campaign._id,
        customerId: customer._id,
        message,
        status: isSent ? 'SENT' : 'FAILED',
      };
    });

    await CommunicationLog.insertMany(logs);

    res.status(201).json({
      message: 'Campaign created',
      campaignId: campaign._id,
      audience: matched.length,
      logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCampaignLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await CommunicationLog.find({ campaignId: id });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
