var express = require('express');
var router = express.Router();
const googleTrends = require('google-trends-api');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(res)
  res.render('index', { title: "Express" });
});

router.get('/googleTrends/interestOverTime', function(req, res, next) {
  if(!req.query.startTime || !req.query.keyword) res.status(400).json({error: "missing keyword and/or startTime"});
  var startTime =  new Date(parseInt(req.query.startTime))
  var endTime = req.query.endTime ?  new Date(parseInt(req.query.endTime)) : new Date(Date.now())


  console.log(endTime);
  googleTrends.interestOverTime({keyword: req.query.keyword, startTime: startTime,endTime: endTime}, function(err, results) {
    if (err) res.json({error: err});
    else  res.json(results);
  });
});

router.get('/googleTrends/interestByRegion', function(req, res, next) {
  var startTime =  new Date(parseInt(req.query.startTime))
  var endTime = req.query.endTime ?  new Date(parseInt(req.query.endTime)) : new Date(Date.now())


  console.log(endTime)
  googleTrends.interestByRegion({keyword: req.query.keyword, startTime:startTime,endTime: endTime, geo: req.query.geo}, function(err, results) {
    if (err) {
      console.log(err)
      res.status(err.status).json({error: err});    }
    else  res.json(results);
  });
});

router.get('/googleTrends/interestByRegion', function(req, res, next) {
  var startTime =  new Date(parseInt(req.query.startTime))
  var endTime = req.query.endTime ?  new Date(parseInt(req.query.endTime)) : new Date(Date.now())
  googleTrends.interestByRegion({keyword: req.query.keyword, startTime: startTime,endTime: endTime, geo: req.query.geo}, function(err, results) {
    if (err) {
      console.log(err)
      res.status(err.status).json({error: err});    }
    else  res.json(JSON.stringify(results.data));
  });
});

router.get('/googleTrends/relatedQueries', function(req, res, next) {
  var startTime =  new Date(parseInt(req.query.startTime))
  var endTime = req.query.endTime ?  new Date(parseInt(req.query.endTime)) : new Date(Date.now())
  googleTrends.relatedQueries({keyword: req.query.keyword, startTime: startTime,endTime: endTime, geo: req.query.geo}, function(err, results) {
    if (err) {
      console.log(err)
      res.status(err.status).json({error: err});    }
    else  res.json(results);
  });
});

router.get('/googleTrends/relatedTopics', function(req, res, next) {
  console.log(req.query)
  var startTime =  new Date(parseInt(req.query.startTime))
  var endTime = req.query.endTime ? new Date(parseInt(req.query.endTime)): new Date()
  console.log(startTime, endTime)
  googleTrends.relatedTopics({keyword: req.query.keyword, startTime: startTime,endTime: endTime, geo: req.query.geo}, function(err, results) {
    if (err) {
      console.log(err)
      res.status(err.status).json({error: err});    }
    else  res.json(results);
  });
});
module.exports = router;
