const Record = require('../record')

const db = require('../../config/mongoose')

const records = require('../../records.json')

db.once('open', () => {
  let recordsData = []
  records.records.forEach((record) => {
    recordsData.push(
      {
        name: record.name,
        category: record.category,
        date: record.date,
        amount: record.amount,
      }
    )
  })
  Record.create(recordsData)
    .then(() => {
      console.log(`insert records done!`)
      db.close()
    })
  console.log('done!')
})