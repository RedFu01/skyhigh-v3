var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const password = 'rmfUxI0sxakaMCnw';
const database = 'skyhigh-data';

const flightUtils = require('../utils/flightUtils');

const connectionString = `mongodb://redfu01:${password}@skyhigh-shard-00-00-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-01-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-02-kuqxv.mongodb.net:27017/${database}?ssl=true&replicaSet=skyhigh-shard-0&authSource=admin`;

const db = mongojs(connectionString);

router.get('/:collection/:index/:interpolated', (req, res, next) => {
    const {
        collection,
        index,
        interpolated
    } = req.params;
    console.log(interpolated);
    db.collection(collection).find({}).limit(1).skip(Number(index), (err, results) => {
        let flight = results[0];
        if (Number(interpolated) != 0) {
            flight.path = getPath(flight, 60);
        }
        res.json(flight);
    })
})

router.get('/key/:collection/:key/:interpolated', (req, res, next) => {
    const {
        collection,
        key,
        interpolated
    } = req.params;
    console.log(interpolated);

    db.collection(collection).find({ key }, (err, results) => {
        let flight = results[0];
        if (Number(interpolated) != 0) {
            flight.path = getPath(flight, 60);
        }

        res.json(flight);
    })
})


/* GET users listing. */
router.get('dep_/:day/:index/:amount', function (req, res, next) {

    const {
        day,
        index,
        amount
    } = req.params;

    db.collection(`flightdata_${day}`).find({}).limit(Number(amount)).skip(Number(index), (err, results) => {
        //console.log(err, result, req.params.timestamp);

        let flights = results.map(flight => {
            flight.path = getPath(flight, 100);
            return flight;
        })

        res.json(flights);
    })
});

function getPath(flight, deltaT) {
    let path = []
    for (let i = flight.depatureTime; i <= flight.arrivalTime; i += deltaT) {
        const point = flightUtils.getPositionAtMoment(flight, i);
        if (point) {
            path.push(point)
        }
    }
    return path;
}

module.exports = router;
