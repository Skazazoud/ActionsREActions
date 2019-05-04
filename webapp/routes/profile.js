const express = require('express')
const router = express.Router()
const tokenss = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODZkZjQwMWNhMDRiMDAxMGM0Njk0NyIsImlhdCI6MTU1MjM0MzUzNn0.5kfChLWVK9Xsks8JnjvVWo1w-mgImVOUpYpR0RoUTuo"

router.get('/profile', function (req, res, next) {
  if (req.body.token == tokenss) {
    res.render('profile', {
      title: 'Profile',
    })
  }
  else {
    res.redirect('/')
  }
})

module.exports = router
