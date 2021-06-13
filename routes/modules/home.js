const express = require('express')
const record = require('../../models/record')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      // const date = records.forEach(record => { convertDate(record.date) })
      res.render('index', { records })
    })
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