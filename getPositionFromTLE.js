export const getPositionFromTle = (station, date, type = 1) => {
    if (!station || !date) return null;

    const positionVelocity = getSolution(station, date);

    const positionEci = positionVelocity.position;
    if (!positionEci) return null;  // Ignore 
        
    if (type === 2) return toThree(positionEci);

    const gmst = satellite.gstime(date);
    const positionEcf = satellite.eciToEcf(positionEci, gmst);
    return toThree(positionEcf);
}
