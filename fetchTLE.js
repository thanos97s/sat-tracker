const fetchTLE = async () => {
  try {
    const res = await fetch('https://celestrak.org/NORAD/elements/stations.txt');
    const text = await res.text();

    const TLELines = text.trim().replace(/\r\n/g, '\n').split('\n');
    const TLESets = [];

    for (let i = 0; i < TLELines.length; i += 3) {
      // Skip if we don't have 3 lines to process
      if (i + 2 >= TLELines.length) break;
      
      const name = TLELines[i].trim();
      const line1 = TLELines[i + 1].trim();
      const line2 = TLELines[i + 2].trim();

      // Validate TLE format before adding
      if (line1.startsWith('1 ') && line2.startsWith('2 ')) {
        TLESets.push({
          name,
          tle1: line1,
          tle2: line2
        });
      }
    }

    return TLESets;
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
