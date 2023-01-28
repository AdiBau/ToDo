const massage = document.querySelector('.massage')

const showMassage = (text) => {
  if (text === 'validation error') {
    massage.innerText = ' ---- STOP HACKING ME ---- '
  } else {
    massage.innerText = 'Add new item: ' + text
  }
  setTimeout(() => massage.classList.toggle('showMassage'), 2000)
  massage.classList.toggle('showMassage')
  return
}
