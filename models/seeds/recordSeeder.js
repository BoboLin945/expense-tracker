const Record = require('../record')

const db = require('../../config/mongoose')

const records = require('../../records.json')

db.once('open', () => {
  records.records.forEach(record => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  })
  console.log('done!')
})