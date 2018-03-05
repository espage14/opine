// REST API routes for the opinions collection
let db = null;
const mongodb = require('mongodb');
mongodb.MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) throw error;
  db = client.db('opine');
  db.opinions = db.collection('opinions');
});

const express = require('express');
const router = express.Router();

// Get all the opinions
router.get('/', function(request, response, next) {
  db.opinions.find().toArray(function(error, opinions) {
    if (error) return next(error);
    response.json(opinions);
  });
});

// GEt a specific opinon
router.get('/:id', function(request, response, next) {
  const opinion = {_id: new mongodb.ObjectId(request.params.id)};

  db.opinions.findOne(opinion, function(error, opinion) {
    if (error) return next(error);
    if (!opinion) return next(new Error('Not found'));
    response.json(opinion);
  });
});

module.exports = router; 
