const Category = require('../category')

const db = require('../../config/mongoose')

const categories = require('../../categories.json')

db.once('open', () => {
  categories.categories.forEach(category => {
    Category.create({
      name: category.name,
      icon: category.icon
    })
      .then(() => {
        console.log(`insert category done!`)
        return db.close()
      })
      .then(() => console.log(`db connection close!`))
  })
  console.log('done!')
})