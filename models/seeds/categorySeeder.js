if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categories = require('../../categories.json').categories

db.once('open', () => {
  Promise.all(categories.map(async category => {
    await Category.create({
      name: category.name,
      icon: category.icon
    })
  }))
    .then(() => {
      console.log('seed categories done!')
      db.close()
    })
})