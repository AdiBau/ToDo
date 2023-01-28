const express = require('express')
const router = express.Router()

const { addItems, doneItem, deleteItem, getItems } = require('./allRouts')

router.route('/items').get(getItems).post(addItems)
router.route('/item/:id').delete(deleteItem).put(doneItem)

module.exports = router
