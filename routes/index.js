var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
module.exports = router;
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'DFPClient', 'views', 'index.html'));
});



