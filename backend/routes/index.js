var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', (req, res) => {
  const mq = req.app.get('mq');
  const { task } = req.body;
  console.log(req.body);
  if (!mq) {
    return res.status(500).json({ error: 'RabbitMQ not connected' });
  }

  mq.sendTask(task);
  res.json({ status: 'queued', task });
});

module.exports = router;
