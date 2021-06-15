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
      .then(() => {
        console.log(`insert category done!`)
        return db.close()
      })
      .then(() => console.log(`db connection close!`))
  })
  console.log('done!')
})