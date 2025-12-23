import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

let watchId = null;

export const startLiveTracking=()=>{
    if(!navigator.geolocation){
        alert("Geolocation not supported")
        return;
    }

    watchId = navigator.geolocation.watchPosition(
        async(pos) =>{
            const {latitude, longitude} = pos.coords;

            await setDoc(
                doc(db, "Livelocations", rideId),
                {
          lat: latitude,
          lng: longitude,
          updatedAt: new Date(),
        },
        { merge: true },
            );
           (err) => console.error(err),
           { enableHighAccuracy: true } 
        }
    )
}

export const stopLiveTracking = async (rideId) => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }

  if (rideId) {
    await deleteDoc(doc(db, "liveLocations", rideId));
  }
};