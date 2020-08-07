const express = require('express')
const router = express.Router();
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')

const Url = require('../models/Url')


//@route POST  /api/url/shorten
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = config.get('baseUrl')

  //Check baseUrl
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid baseUrl')
  }

  //Create url code
  const urlCode = shortid.generate()
  console.log(urlCode)
  //Check longUrl
  if (validUrl.isUri(longUrl)) {
    try {

      let url = await Url.findOne({ longUrl })
      console.log(url + "Boom")
      if (url) {
        res.json(url)
      } else {
        const shortUrl = baseUrl + '/' + urlCode
        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date()
        });
        await url.save()
        res.json(url)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(401).json('Invalid long url')
  }

})

module.exports = router