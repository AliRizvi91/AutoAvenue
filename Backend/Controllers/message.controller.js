const { sendMessager } = require('../sendMail/sendMessage');
const User = require('../models/User');

const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(401).json({ message: 'Please fill in all fields' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      await sendMessager(name, email, subject, message);
      return res.status(200).json({ message: 'Message is sent' });
    } else {
      return res.status(404).json({ message: 'User does not exist' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Message is not sent', error });
  }
};

module.exports = { createMessage };
