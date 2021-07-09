const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      Category.find()
        .lean()
        .then(categories => {
          records.forEach(record => {
            record.date = convertDate(record.date)
            totalAmount += record.amount
            const category = categories.find(category => {
              if (category.name === record.category) {
                record.icon = category.icon
              }
            })
          })
          res.render('index', { records, categories, totalAmount })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// filter by category
router.post('/filter', (req, res) => {
  const userId = req.user._id
  const category = req.body.category ? req.body.category : { $ne: '' }
  const inputMonth = req.body.yearMonth
  const year = Number(inputMonth.split('-')[0]) ? Number(inputMonth.split('-')[0]) : { $ne: '' }
  const month = Number(inputMonth.split('-')[1]) ? Number(inputMonth.split('-')[1]) : { $ne: '' }
  Record
    .aggregate([
      { $project: { name: 1, amount: 1, userId: 1, date: 1, category: 1, 'year': { $year: '$date' }, 'month': { $month: '$date' } } },
      { $match: { userId, category, year: year, month: month } }
    ])
    .then(records => {
      let totalAmount = 0
      Category
        .find()
        .lean()
        .then(categories => {
          records.forEach((record) => {
            record.date = convertDate(record.date)
            totalAmount += record.amount
            const category = categories.find(category => {
              if (category.name === record.category) {
                record.icon = category.icon
              }
            })
          })
          res.render('index', { records, categories, totalAmount, category, inputMonth })
        })
    })
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