var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const password = 'rmfUxI0sxakaMCnw';
const database = 'skyhigh-data';

const connectionString = `mongodb://redfu01:${password}@skyhigh-shard-00-00-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-01-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-02-kuqxv.mongodb.net:27017/${database}?ssl=true&replicaSet=skyhigh-shard-0&authSource=admin`;

const db = mongojs(connectionString);

router.get('/range/:range', (req,res, next)=>{
    const {
        range
    } = req.params;
  
    db.collection(`links_durations_${range}_total`).find({ }, (err, result) => {
        try {
            res.json(result);
        } catch (e) {
            res.json([]);
        }
    })  
})

router.get('/range/:range/eastbound', (req,res, next)=>{
    const {
        range
    } = req.params;
  
    db.collection(`links_durations_${range}_eastbound`).find({ }, (err, result) => {
        try {
            res.json(result);
        } catch (e) {
            res.json([]);
        }
    })  
})

router.get('/range/:range/westbound', (req,res, next)=>{
    const {
        range
    } = req.params;
  
    db.collection(`links_durations_${range}_westbound`).find({ }, (err, result) => {
        try {
            res.json(result);
        } catch (e) {
            res.json([]);
        }
    })  
})

router.get('/range/:range/encounter', (req,res, next)=>{
    const {
        range
    } = req.params;
  
    db.collection(`links_durations_${range}_encounter`).find({ }, (err, result) => {
        try {
            res.json(result);
        } catch (e) {
            res.json([]);
        }
    })  
})

module.exports = router;
