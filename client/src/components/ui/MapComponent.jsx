import React, { useEffect, useState } from "react";
import { YMaps, Map, GeoObject , Placemark} from '@pbe/react-yandex-maps';

export default function MapComponent() {
const [startPoint,setStartPoint ] = useState([]);
const [endPoint,setEndPoint] = useState([]);

useEffect(() => {
    axios.get('/api/routes')
    .then((data) => setStartPoint(data.data.startPoint))
    }, []);

    useEffect(() => {
        axios.get('/api/routes')
        .then((data) => setEndPoint(data.data.endPoint))
        }, []);    

const xOne = Number(startPoint.split(', ').[0]);
const yOne = Number(startPoint.split(', ').[1]);

const xTwo = Number(startPoint.split(', ').[0]);
const yTwo = Number(startPoint.split(', ').[1]);


    return (
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
</YMaps>;


   <YMaps>
    <Map
      defaultState={{
        center: [55.751574, 37.573856],
        zoom: 3,
      }}
    >
      <GeoObject
        geometry={{
          type: "LineString",
          coordinates: [
            [${xOne}, ${yOne}],
            [${xTwo}, ${yTwo}],
          ],
        }}
        options={{
          geodesic: true,
          strokeWidth: 5,
          strokeColor: "#F008",
        }}
      />
    </Map>
  </YMaps>;
  
      </div>
    )
  }
  