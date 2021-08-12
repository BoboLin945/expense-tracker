// delete action
const expensesList = document.querySelector('#expenses-list')
const deleteSubmit = document.querySelector('#delete-submit')
expensesList.addEventListener('click', function deleteButtonClicked(event) {
  if (event.target.matches('#delete-button')) {
    const id = event.target.dataset.id
    deleteSubmit.action = `./expenses/${id}/?_method=DELETE`
  }
})


