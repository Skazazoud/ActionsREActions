const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Accueil',
  })
})

router.post('/', (req, res, next) => {
});

module.exports = router
