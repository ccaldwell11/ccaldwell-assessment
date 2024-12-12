import express, { Request, Response } from 'express';
import axios from 'axios';

const Parcel = express.Router();

Parcel.get('/geometry', (req, res) => {
  const { lat, long } = req.query;

  const url = `https://gis.nola.gov/arcgis/rest/services/dev/property3/MapServer/15/query?geometry=${long},${lat}&geometryType=esriGeometryPoint&inSR=3857&spatialRel=esriSpatialRelIntersects&outFields=*&f=json`;

  axios
    .get(url)
    .then(({ data }) => {
      const features = data.features || [];
      if (features.length > 0) {
        const feature = features[0];
        const geometry = feature.geometry;
        const attributes = feature.attributes;
        return res.json({ geometry, attributes });
      } else {
        return res.sendStatus(404);
      }
    })
    .catch((error) => {
      console.error('error fetching parcel geometry:', error);
      return res.sendStatus(500);
    });
});

Parcel.get('/info', (req, res) => {
  const { lat, long } = req.query;

  const url = `https://gis.nola.gov/arcgis/rest/services/dev/property3/MapServer/15/query?geometry=${lat},${long}&geometryType=esriGeometryPoint&inSR=3857&spatialRel=esriSpatialRelIntersects&outFields=*&f=json`;

  axios
    .get(url)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error('error fetching parcel data:', error.message);
      res.sendStatus(500);
    });
});

export default Parcel;
