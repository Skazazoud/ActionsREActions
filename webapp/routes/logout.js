const express = require('express')
const router = express.Router()

router.get('/logout', function (req, res, next) {
  res.render('logout', {
    title: 'Déconnexion',
  })
})

module.exports = router
