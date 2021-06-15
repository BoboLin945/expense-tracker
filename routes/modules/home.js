const express = require('express')
const category = require('../../models/category')
const record = require('../../models/record')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Record.find()
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
              if(category.name === record.category) {
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
  const category = req.body.category
  Record
    .aggregate([{ $match: { category: category } }])
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
          res.render('index', { records, categories, totalAmount, category })
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