const express = require('express')
const router = express.Router()
const publicontroller = require('../controller/publicontroller')

router.get('/', publicontroller.showFiles)
router.post('/download', publicontroller.downloadFile)

module.exports = router