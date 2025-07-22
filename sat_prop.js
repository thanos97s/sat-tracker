const sat_prop(tleSets) = async() => {

import * as satellite from 'satellite.js';
//const tleData = await fetchTLE();
//const iss = tleData.find(sat => sat.name.includes('ISS'));


  // Sample TLE
var tleLine1 = '1 25544U 98067A   13149.87225694  .00009369  00000-0  16828-3 0  9031',
    tleLine2 = '2 25544 051.6485 199.1576 0010128 012.7275 352.5669 15.50581403831869';

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
