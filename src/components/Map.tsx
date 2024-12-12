import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { Polygon } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Style, Fill, Stroke } from 'ol/style';

interface GeoMapProps {
  selectedLocation: { lat: number; long: number } | null;
  parcelGeometry: {
    rings: [number, number][][];
  } | null;
}

const GeoMap: React.FC<GeoMapProps> = ({
  selectedLocation,
  parcelGeometry,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vectorLayer, setVectorLayer] =
    useState<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current || undefined,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [-10027059.156976, 3498519.195240259], // default NOLA center coords
        zoom: 12,
      }),
    });

    setMap(initialMap);

    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (selectedLocation && map) {
      const lonLat = [selectedLocation.long, selectedLocation.lat];
      map.getView().setCenter(lonLat);
      map.getView().setZoom(19);
    }
  }, [selectedLocation, map]);

  useEffect(() => {
    if (parcelGeometry && map) {
      const vectorSource = new VectorSource();

      // create polygon/parcel (shape and area of land plot)
      const features = parcelGeometry.rings.map((ring) => {
        // rings are like mathematical points
        return new Feature({
          geometry: new Polygon([ring]),
        });
      });

      // add overlay w styling
      features.forEach((feature) => {
        feature.setStyle(
          new Style({
            stroke: new Stroke({
              color: 'red',
              width: 2,
            }),
            fill: new Fill({
              color: 'rgba(96, 62, 62, 0.25)',
            }),
          })
        );
        vectorSource.addFeature(feature);
      });

      const newVectorLayerInstance = new VectorLayer({
        source: vectorSource,
      });

      // avoid dupes
      if (vectorLayer) {
        map.removeLayer(vectorLayer);
      }

      setVectorLayer(newVectorLayerInstance);
      map.addLayer(newVectorLayerInstance);
    }
  }, [parcelGeometry, map]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default GeoMap;
