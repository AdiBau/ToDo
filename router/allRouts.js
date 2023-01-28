const path = require('path')
const { StatusCodes } = require('http-status-codes')
const { readFile, writeFile } = require('fs').promises

const file = path.join(__dirname, '..', 'database', 'dataBase.json')

//  get all the Items in the database

async function getItems(req, res) {
  const items = await readFile(file, 'utf-8')
  res.json(JSON.parse(items))
}

// add a new item to the database

async function addItems(req, res, next) {
  const { item } = req.body

  if (!item) {
    return res.status(StatusCodes.BAD_REQUEST).send('No matching item')
  }

  const regex = /<|>|#|\$/g
  const valid = item.match(regex)
  if (valid === null) {
    try {
      const newItem = {
        id: Date.now(),
        ...req.body,
      }
      const items = JSON.parse(await readFile(file, 'utf-8'))

      items.push(newItem)
      await writeFile(file, JSON.stringify(items), 'utf-8')
      return res.status(StatusCodes.OK).end()
    } catch (error) {
      console.error(error)
      res.status(StatusCodes.InternalServerError).send('Please try again')
    }
  }
  res.status(StatusCodes.FORBIDDEN).send('Stop Hacking Me')
}

// delete the current item
async function deleteItem(req, res) {
  const id = Number(req.params.id)
  try {
    const items = JSON.parse(await readFile(file, 'utf-8'))
    const newItems = items.filter((item) => item.id !== id)
    await writeFile(file, JSON.stringify(newItems), 'utf-8')
    res.status(StatusCodes.OK).end()
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.InternalServerError).send('Please try again')
  }
}

// set the current item done
async function doneItem(req, res) {
  const id = Number(req.params.id)
  try {
    const items = JSON.parse(await readFile(file, 'utf-8'))
    const newItems = items.filter((item) => {
      if (item.id === id) {
        item.done = !item.done
      }
      return item
    })
    await writeFile(file, JSON.stringify(newItems), 'utf-8')
    res.end()
  } catch (error) {
    console.error(error)
    res.status(StatusCodes.InternalServerError).send('Please try again')
  }
}

module.exports = {
  getItems,
  addItems,
  deleteItem,
  doneItem,
}
