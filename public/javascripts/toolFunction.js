const toolFunction = {
  // get categories icon
  categoryIcon(record, category) {
    if (category.name === record.category) {
      return record.icon = category.icon
    }
  },
  // getDate
  convertDate(date) {
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
}

module.exports = toolFunction