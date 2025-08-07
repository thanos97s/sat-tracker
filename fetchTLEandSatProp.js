import * as satellite from 'satellite.js';

const fetchTLEandSatProp = async () => {
      try {
        const res = await fetch('https://celestrak.org/NORAD/elements/stations.txt');
        const text = await res.text();

        const TLELines = text.trim().replace(/\r\n/g, '\n').split('\n');
        const Sets = [];
        const now = new Date();
        
        for (let i = 0; i < TLELines.length; i += 3) {
          if (i + 2 >= TLELines.length) break;
          
          const name = TLELines[i].trim();
          const line1 = TLELines[i + 1].trim();
          const line2 = TLELines[i + 2].trim();
          
          // Validate TLE format
          if (line1.startsWith('1 ') && line2.startsWith('2 ')) {
            try {
              const satrec = satellite.twoline2satrec(line1, line2);
              const positionAndVelocity = satellite.propagate(satrec, now);
              
              if (positionAndVelocity.position) {
                const gmst = satellite.gstime(now);
                const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

                const longitude = satellite.degreesLong(positionGd.longitude);
                const latitude = satellite.degreesLat(positionGd.latitude);
                const altitude = positionGd.height * 1000; // Convert km to meters
                
                Sets.push({
                  name,
                  tle1: line1,
                  tle2: line2,
                  lon: longitude,
                  lat: latitude,
                  alt: altitude,
                  satrec: satrec
                });
              }
            } catch (e) {
              console.warn(`Error processing satellite ${name}:`, e);
            }
          }
        }

        return Sets;
      } catch (error) {
        console.error('Error fetching TLE data:', error);
        return [];
      }
    };
    return Sets;
  } catch (error) {
    console.error('Error fetching TLE data:', error);
    return []; // Return empty array on error
  }
};

// Example usage:
fetchTLE().then(data => {
  console.log('Fetched TLE sets:', data.length);
  if (data.length > 0) {
    console.log('First satellite:', data[0]);
  }
});
