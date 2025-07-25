const satProp(TLESets) = async() => {

import * as satellite from 'satellite.js';
const iss = TLESets.find(sat => sat.name.includes('ISS'));


// Initialize a satellite record
var satrec = satellite.twoline2satrec(tleLine1, tleLine2); 
const now = new Date();

//  Propagate satellite using a JavaScript Date.
var positionAndVelocity = satellite.propagate(satrec, now);

const gmst = satellite.gstime(now);
const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

const longitude = satellite.degreesLong(positionGd.longitude);
const latitude = satellite.degreesLat(positionGd.latitude);
const altitude = positionGd.height;

console.log({ latitude, longitude, altitude });

};
