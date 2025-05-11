import Customer from '../models/Customer.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: 'Customer added', customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
