const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const config = require('../config');

MongoClient.connect(config.mongoUri, (err, db) => {
  console.log('Connection successful');

  router.get('/', (req, res, next) => {
    db.collection('contacts').find({}).toArray((err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      res.send(result);
    })
  });

  router.get('/:id', (req, res, next) => {
    const _id = ObjectId(req.params.id);
    db.collection('contacts').findOne({ _id }, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      res.send(result);
    })
  })

  router.post('/', (req, res, next) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.address
      || !req.body.email_address || !req.body.contact_number) {
      res.status(400).send('all fields must be filled');
    }

    const contactInfo = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      email_address: req.body.email_address,
      contact_number: req.body.contact_number,
    };
    db.collection('contacts').insert(contactInfo, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      res.send(result);
    });
  });

  router.put('/:id', (req, res, next) => {
    const _id = ObjectId(req.params.id);
    if (!req.body.first_name || !req.body.last_name || !req.body.address
      || !req.body.email_address || !req.body.contact_number) {
      res.status(400).send('all fields must be filled');
    }

    const contactInfo = {
      _id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      email_address: req.body.email_address,
      contact_number: req.body.contact_number,
    };

    db.collection('contacts').findOneAndUpdate({ _id }, {$set: contactInfo}, {}, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      res.send(result);
    });
  });

  router.delete('/:id', (req, res, next) => {
    const _id = ObjectId(req.params.id);
    db.collection('contacts').findOneAndDelete({ _id }, {}, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      res.send('Delete successful');
    });
  });

});

module.exports = router;