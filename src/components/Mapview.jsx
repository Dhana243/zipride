import React, { useEffect, useRef, useState} from "react";
import {MapContainer, TileLayer, Marker, useMap, Popup} from "react-leaflet"
import L, { Layer } from "leaflet";
import "leaflet-routing-machine";
import {pickupIcon, dropIcon} from "./MarkerIcons"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


function MapCenter({pickup,drop}){
    const map = useMap();
    const routingRef = useRef(null);
    const [livePos, setLivePos] = useState(null);

    useEffect(() => {
    // remove old route safely
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // add route only if BOTH coords exist
    if (pickup && drop) {
      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(pickup[0], pickup[1]),
          L.latLng(drop[0], drop[1]),
        ],
        addWaypoints: false,
        draggableWaypoints: false,
        show: false,
        lineOptions: { styles: [{ weight: 4 }] },
      }).addTo(map);

      map.fitBounds([pickup, drop], { padding: [50, 50] });
    } else if (pickup) {
      map.setView(pickup, 15);
    } else{
      map.setView([9.9252, 78.1198], 13);
    }
  }, [pickup, drop, map]);

  return null;
}

export default function Mapview({pickup,drop, rideId}){
  const [livePos, setLivePos] = useState(null);

  useEffect(() => {
    if (!rideId) return;

    const unsub = onSnapshot(
      doc(db, "liveLocations", rideId),
      (snap) => {
        if (snap.exists()) {
          setLivePos(snap.data());
        }
      }
    );

    return () => unsub();
  }, [rideId]);

    return (
        <MapContainer center={[9.9252, 78.1198]} zoom={15} style={{width: "50%", height: "400px", marginTop: "40px", marginLeft: "50px"}}>
            
            <TileLayer attribution="OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

            <MapCenter pickup={pickup} drop={drop}/>

            {pickup && <Marker position={pickup} icon={pickupIcon} />}
            {drop && <Marker position={drop} icon={dropIcon}/>}

            {livePos && (
        <Marker position={[livePos.lat, livePos.lng]}>
          <Popup>🚗 Live Location</Popup>
        </Marker>
      )}


        </MapContainer>
    )
}