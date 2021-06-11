const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Create Page
router.get('/create', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('create', { categories }))
})

// Create
router.post('/', (req, res) => {
  const addItem = req.body
  return Record.create({
    name: addItem.name,
    date: addItem.date,
    category: addItem.category,
    amount: addItem.amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router