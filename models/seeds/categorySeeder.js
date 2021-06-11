const Category = require('../category')

const db = require('../../config/mongoose')

const categories = require('../../categories.json')

db.once('open', () => {
  categories.categories.forEach(category => {
    Category.create({
      name: category.name,
      icon: category.icon
    })
  })
  console.log('done!')
})