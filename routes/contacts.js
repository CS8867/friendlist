const express = require('express');
const router = express.Router();


// @route  Get api/contacts
// @desc   Get all contacts
// @access Private
router.get('/', (req, res) => {
  res.send('Get all contacts')
});

// @route  Post api/contacts
// @desc   add new contact
// @access Private
router.post('/', (req, res) => {
  res.send('Add new contact')
});

// @route  Put api/contacts/:id
// @desc   update contact
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update contact')
});

// @route  delete api/contacts/:id
// @desc   delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact')
});

module.exports = router;