import CommunicationLog from '../models/CommunicationLog.js';

export const deliveryReceipt = async (req, res) => {
  try {
    const { logId, status } = req.body;

    // Validate status
    if (!['SENT', 'FAILED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be SENT or FAILED.' });
    }

    // Update the delivery status in the communication log
    const updatedLog = await CommunicationLog.findByIdAndUpdate(
      logId,
      { status },
      { new: true }
    );

    if (!updatedLog) {
      return res.status(404).json({ error: 'Log entry not found' });
    }

    res.status(200).json({ message: 'Delivery status updated', log: updatedLog });

  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};

