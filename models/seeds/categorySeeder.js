const Category = require('../category')

const db = require('../../config/mongoose')

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