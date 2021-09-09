const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, check, validationResult } = require('express-validator');


// @route  Get api/contacts
// @desc   Get all contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    // console.log(contacts);
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({msg: 'Server Error'});
  }
});

// @route  Post api/contacts
// @desc   add new contact
// @access Private
router.post(
  '/', 
  [
    auth, 
    body('name').not().isEmpty()
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status('500').json({ msg: 'Server Error'} );
    }
  }
);

// @route  Put api/contacts/:id
// @desc   update contact
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build a Contact Object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    console.log(contact);
    if(!contact) {
      return res.status('404').json({ msg: 'Contact not found' });
    }

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id) {
      return res.status('401').json({ msg: 'Not Authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      {$set: contactFields},
      {new: true}
    )

    res.json(contact);

  } catch (error) {
    console.error(error.message);
    res.status('500').json({ msg: 'Server Error'} );
  }
});

// @route  delete api/contacts/:id
// @desc   delete contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    console.log(contact);
    if(!contact) {
      return res.status('404').json({ msg: 'Contact not found' });
    }

    // Make sure user owns contact
    if(contact.user.toString() !== req.user.id) {
      return res.status('401').json({ msg: 'Not Authorized' });
    }

    await Contact.findByIdAndRemove(req.params.id)

    res.json({msg: 'Contact Deleted'});

  } catch (error) {
    console.error(error.message);
    res.status('500').json({ msg: 'Server Error'} );
  }
});

module.exports = router;