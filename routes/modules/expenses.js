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
  const userId = req.user._id
  const {name, date, category, amount, merchant} = req.body
  return Record.create({
    name,
    date,
    category,
    amount,
    merchant,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Update Page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      Category.find()
        .lean()
        .then(categories => {
          const date = convertDate(record.date)
          const category = record.category
          const merchant = record.merchant
          res.render('edit', { record, date, category, categories, merchant, message: req.flash('message') })
        })
    })
    .catch(error => console.error(error))
})

// Update
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, date, amount, merchant } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchant = merchant
      return record.save()
    })
    .then(() => {
      req.flash('success_msg', '修改成功')
      res.redirect(`/expenses/${_id}/edit`)
    })
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// functions
// getDate
function convertDate(date) {
  date = new Date(date)
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  return (year + '-' + month + '-' + day)
}

module.exports = router