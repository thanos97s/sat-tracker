import * as satellite from 'satellite.js';
import fetchTLE from './fetchTLE.js';

window.CESIUM_BASE_URL = '/';

import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NjkzOTNjYy0xOGI4LTQ1M2QtOTNiOS0zNTM2OTFiMTg4MTQiLCJpZCI6MzIyMTQ3LCJpYXQiOjE3NTI2OTQ5ODV9.c5dy8PXgAJzN1kAyAjZ03WzqxgEYpS2mAJB6qU0Yq3U';

// Initialize Cesium viewer
(async () => {
  const viewer = new Viewer('cesiumContainer', {
  terrain: Terrain.fromWorldTerrain(),
});    

const TLEData = await fetchTLE();

const satrec = satellite.twoline2satrec(TLEData[0].tle1, TLEData[0].tle2);
  const now = new Date();

  const positionAndVelocity = satellite.propagate(satrec, now);
  const gmst = satellite.gstime(now);

  if (positionAndVelocity.position) {
    const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);
    const longitude = satellite.degreesLong(positionGd.longitude);
    const latitude = satellite.degreesLat(positionGd.latitude);
    const altitude = positionGd.height*1000; //in m

  


  viewer.entities.add({
  name: "ISS",
  position: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
  point: { pixelSize: 10, color: Cesium.Color.RED }
});

 viewer.zoomTo(viewer.entities); // Optional: zoom to entity
} else {
  console.error("Failed to compute satellite position.");
}
})();
