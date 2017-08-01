"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPositionAtMoment = getPositionAtMoment;
function getPositionAtMoment(flight, moment) {
    if (moment > flight.arrivalTime || moment < flight.depatureTime) {
        return null;
    }
    let lastPos = null;
    let nextPos = null;
    for (let i = 1; i < flight.path.length; i++) {
        if (flight.path[i].ts > moment) {
            nextPos = flight.path[i];
            break;
        }
    }
    const reversePath = flight.path.slice().reverse();
    for (let j = 0; j < reversePath.length; j++) {
        if (reversePath[j].ts < moment) {
            lastPos = reversePath[j];
            break;
        }
    }

    if (!lastPos || !nextPos) {
        return null;
    }

    let res = {
        pos: {
            lat: lastPos.pos.lat + (nextPos.pos.lat - lastPos.pos.lat) * (moment - lastPos.ts) / (nextPos.ts - lastPos.ts),
            lng: lastPos.pos.lng + (nextPos.pos.lng - lastPos.pos.lng) * (moment - lastPos.ts) / (nextPos.ts - lastPos.ts),
        },
        ts: moment,
        track: lastPos.track + (nextPos.track - lastPos.track) * (moment - lastPos.ts) / (nextPos.ts - lastPos.ts),
        altitude: lastPos.altitude + (nextPos.altitude - lastPos.altitude) * (moment - lastPos.ts) / (nextPos.ts - lastPos.ts),
        horizontalSpeed: lastPos.horizontalSpeed + (nextPos.horizontalSpeed - lastPos.horizontalSpeed) * (moment - lastPos.ts) / (nextPos.ts - lastPos.ts),
        verticalSpeed: lastPos.verticalSpeed + (nextPos.verticalSpeed - lastPos.verticalSpeed) * (moment - lastPos.ts) / (nextPos.ts - lastPos.ts),
    };

    console.log(moment, lastPos.ts, nextPos.ts, `L ${lastPos.pos.lat}-${lastPos.pos.lng}`, `N ${nextPos.pos.lat}-${nextPos.pos.lng}`, `R ${res.pos.lat}-${res.pos.lng}`)

    return res;
}