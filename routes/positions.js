var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const password = 'rmfUxI0sxakaMCnw';
const database = 'skyhigh-data';

const connectionString = `mongodb://redfu01:${password}@skyhigh-shard-00-00-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-01-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-02-kuqxv.mongodb.net:27017/${database}?ssl=true&replicaSet=skyhigh-shard-0&authSource=admin`;

const db = mongojs(connectionString);

router.get('/headings', (req,res, next)=>{
  
    db.collection('accumulated_days_angles_3').find({ }, (err, result) => {
        try {
            res.json(result);
        } catch (e) {
            res.json([]);
        }
    })  
})

/* GET users listing. */
router.get('/:timestamp', function (req, res, next) {

    db.collection('posMap_accumulated_days_5').find({ id: Number(req.params.timestamp) }, (err, result) => {
        //console.log(err, result, req.params.timestamp);
        console.log(result[0].positionMap.length);
        try {
            res.json(result.length > 0 ? result[0].positionMap : []);
        } catch (e) {
            res.json([]);
        }
    })
});

module.exports = router;
