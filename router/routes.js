const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../modals/modals');
const authenticate = require('../middleware/middleware');

// ###################### API CODE ######################
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res
        .status(422)
        .json({ message: 'Email Already Exist', status: 422 });
    } else {
      const Registered = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      const result = await Registered.save();
      if (result) {
        res
          .status(201)
          .json({ message: 'Registerd Successfully', status: 201 });
      }
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Email Already Exist', status: 400 });
  }
});
// ##### LOGIN API ###########
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const useremail = await User.findOne({ email: email });
    if (useremail) {
      const passMatch = await bcrypt.compare(
        password,
        useremail.password
      );

      const token = await useremail.generateAuthCode();
      // console.log(token);
      if (passMatch) {
        res.cookie('authtoken', token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });

        res
          .status(200)
          .json({ message: 'login succesfully', status: 200 });
      } else {
        res
          .status(400)
          .json({ message: 'Invalid Credentials', status: 400 });
      }
    } else {
      res
        .status(400)
        .json({ message: 'Invalid Credentials', status: 400 });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/aboutus', authenticate, (req, res) => {
  if (req.msg === 'error') {
    res.status(400).json({ status: 400 });
  } else {
    res.status(400).json(req.Data);
  }
});
router.get('/getdata', authenticate, (req, res) => {
  if (req.msg === 'error') {
    res.status(400).json({ status: 400 });
  } else {
    res.status(400).json(req.Data);
  }
});

router.post('/contactus', authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const messageData = await User.findOne({ _id: req.userID });
    if (messageData) {
      const myMessage = await messageData.sendMessage(
        name,
        email,
        phone,
        message
      );

      await messageData.save();

      res.status(201).json({ message: 'Message Saved' });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('authtoken', { path: '/' });
  res.status(200).json({ status: 200 });
});

app.get('/*', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname, '/client/build/'));
});
module.exports = router;
