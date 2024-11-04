const express = require('express')
const router = express.Router()
const admin = require('../queries/admin_queries.js')

router.get('/', admin.checkAdmin, function (req, res) { res.sendStatus(200) })
router.get('/get_pending', admin.checkAdmin, admin.getAllPending)
router.get('/review/:id', admin.checkAdmin, admin.getPendingByID)
router.post('/review/deny/:id', admin.checkAdmin, admin.denyPendingRecipe)
router.post('/review/approve/:id', admin.checkAdmin, admin.approvePendingRecipe)

module.exports = router


