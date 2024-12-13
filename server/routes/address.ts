import express from 'express';
import axios from 'axios';

const Address = express.Router();

// Address.get('/test', (req: Request, res: Response) => {
//     res.send('is this thing on?')
// })

Address.get('/suggestions', (req, res) => {
  const { query } = req.query as string;

  // axios.get(`https://gis.nola.gov/arcgis/rest/services/dev/property3/MapServer/14/query?where=FULLADDR%20%3D%20%27${query}%27%20AND%20MUNICIPALITY%20%3D%20%27New%20Orleans%27&outFields=FULLADDR%2CMUNICIPALITY&returnGeometry=true&f=json`)

  // exact and/or only search result
  axios
    .get(
      'https://gis.nola.gov/arcgis/rest/services/dev/property3/MapServer/14/query',
      {
        params: {
          where: `FULLADDR = '${query}' AND MUNICIPALITY = 'New Orleans'`,
          // limit outfields for faster api response
          outFields: 'FULLADDR,MUNICIPALITY',
          returnGeometry: true,

          f: 'json',
        },
      }
    )
    .then(({ data }) => {
      let features = data.features || [];
      if (features.length > 0) {
        return res.json(
          features.map((feature: any) => ({
            address: feature.attributes.FULLADDR,
            coordinates:
              feature.geometry?.x && feature.geometry?.y
                ? [feature.geometry.x, feature.geometry.y]
                : null,
          }))
        );
      }

      // suggestions if direct result not found
      return axios.get(
        'https://gis.nola.gov/arcgis/rest/services/dev/property3/MapServer/14/query',
        {
          params: {
            where: `FULLADDR LIKE '${query}%' AND MUNICIPALITY = 'New Orleans'`,
            outFields: 'FULLADDR,MUNICIPALITY',
            returnGeometry: true,
            f: 'json',
          },
        }
      );
    })
    .then(({ data }) => {
      const features = data.features || [];
      return res.json(
        features.map((feature: any) => ({
          address: feature.attributes.FULLADDR,
          coordinates:
            feature.geometry?.x && feature.geometry?.y
              ? [feature.geometry.x, feature.geometry.y]
              : null,
        }))
      );
    })
    .catch((error) => {
      console.error('error fetching suggestions:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch address suggestions' });
    });
});

export default Address;
