import React, { useEffect, useState } from 'react';
import { YMaps, Map, GeoObject, Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';
import CardMapComponent from './CardMapComponent';

export default function MapComponent({ route }) {
  const xOne = Number(startPoint.split(', ')[0]);
  const yOne = Number(startPoint.split(', ')[1]);

  const xTwo = Number(endPoint.split(', ')[0]);
  const yTwo = Number(endPoint.split(', ')[1]);
  return (
    <>
      <CardMapComponent />
      <div>
        <YMaps>
          <Map
            defaultState={{
              center: [55.751574, 37.573856],
              zoom: 5,
            }}
          >
            <Placemark geometry={[55.684758, 37.738521]} />
          </Map>
        </YMaps>
        ;
        <YMaps>
          <Map
            defaultState={{
              center: [55.751574, 37.573856],
              zoom: 3,
            }}
          >
            <GeoObject
              geometry={{
                type: 'LineString',
                coordinates: [
                  [xOne, yOne],
                  [xTwo, yTwo],
                ],
              }}
              options={{
                geodesic: true,
                strokeWidth: 5,
                strokeColor: '#F008',
              }}
            />
          </Map>
        </YMaps>
        ;
      </div>
    </>
  );
}
