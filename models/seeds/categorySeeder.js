if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categories = require('../../categories.json')

db.once('open', () => {
  let categoriesData = []
  categories.categories.forEach((category) => {
    categoriesData.push(
      {
        name: category.name,
        icon: category.icon
      })
  })
  Category.create(categoriesData)
    .then(() => {
      console.log(`insert categories done!`)
      db.close()
    })
  console.log('done!')
})