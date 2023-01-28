const submit = document.querySelector('.formSubmit')
const items = document.querySelector('.items')
const item = document.querySelector('#item')
const important = document.querySelector('#important')

const loadItems = async () => {
  items.innerHTML = ''
  important.checked = false
  const data = await fetch('/items').then((items) => items.json())
  if (data.length === 0) {
    items.innerText = 'To Do list is empty'
  } else {
    items.innerHTML = data
      .map((item) => {
        return ` <div class='item' id=${item.id}> 
                    <div class="round" >
                       <input type="checkbox" id="checkbox1" ${item.done && 'checked'} ></input>
                       <label for="checkbox1" onclick='doneItem(${item.id})' ></label>
                    </div>
                    <h4 class= "${item.important && 'important '} ${item.done && 'itemChecked'}">${item.item}</h4> 
                    <span class="material-symbols-outlined trash"  onclick="removeItem(${item.id})">delete_forever</span>
               </div>
               `
      })
      .reverse()
      .join('')
    const trash = document.querySelectorAll('.trash')
    trash.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.target.parentElement.classList.add('goOut')
      })
    })
  }
}

const removeItem = (id) => {
  console.log('Removing item', id)
  setTimeout(() => {
    fetch(`/item/${id}`, { method: 'delete' }).then((req) => req.status === 200 && loadItems())
  }, 700)
}

const doneItem = (id) => {
  fetch(`/item/${id}`, { method: 'put' }).then((req) => req.status === 200 && loadItems())
}

submit.addEventListener('submit', async (e) => {
  e.preventDefault()
  isValidate(item.value) ? send(item.value) : showMassage('validation error')
})

const send = async (value) => {
  try {
    await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: value,
        important: important.checked,
      }),
    })
    showMassage(value)
    item.value = ''
  } catch (error) {}
  loadItems()
}

loadItems()
