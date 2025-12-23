import React from "react";
import { useState } from "react";
import Mapview from "./Mapview";
import TripInfo from "./TripInfo";
import {startLiveTracking,stopLiveTracking} from "./LiveTracking"
import TripHistory from "./TripHistory";

// import RoomIcon from "@mui/icons-material/Room";
// import FlagIcon from "@mui/icons-material/Flag";
// import {RoomIcon} from "@mui/icons-material"
// import TripHistory from "./TripHistory";

const api_key ="6dabb85fc8ce4f5cba35c07905e4faa7";

export default function Booking(){

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [pickupList, setPickupList] = useState([]);
  const [dropList, setDropList] = useState([]);

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const [showTripInfo, setShowTripInfo] = useState(false);
  const [lastRideIndex, setLastRideIndex] = useState(null);
  const [rideId, setRideId] = useState(null);
// auto address complete
  const searchAddress = async (text,setList)=>{
    if(text.length < 3){
        setList([])
        return;
    }
    const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${text}&key=${api_key}&countrycode=in&limit=7&min_confidence=3`
    )
    const data = await res.json();
    setList(data.results)
  }
// getting live location
  const getLiveLocation=()=>{
    if(!navigator.geolocation){
        alert("Geolocation is not supported: please enter your location manually")
        return;
    }
    // current location
    navigator.geolocation.getCurrentPosition(
        async (position)=>{
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`)
            console.log("Accuracy (meters):", position.coords.accuracy);
            if(position.coords.accuracy > 1000){
                alert("Location not accurate. Please type your address manually")
                return;
            }
            
           const data = await res.json()
           if(data.results && data.results.length > 0){
           setPickup(data.results[0].formatted);
           setPickupList([])
           setPickupCoords([lat,lng]);
        }
        },
        ()=>{
            alert("location permission denied: please enter your address manually")
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}
    )
  }
const handleSubmit=()=>{
    if (!pickup || !drop) return alert("Enter both pickup and drop!");
    if (!pickupCoords || !dropCoords) return alert("Select addresses from suggestions!");
    setShowTripInfo(true);
  }

const handleCloseTrip=()=>{
    setPickup("")
    setDrop("")
    setPickupCoords(null)
    setDropCoords(null)
    setPickupList([])
    setDropList([])
    setShowTripInfo(false)
}
const handleCancelRide = async () => {
  if (rideId) {
    await stopLiveTracking(rideId);
    setRideId(null);
  }

  setPickup("");
  setDrop("");
  setPickupCoords(null);
  setDropCoords(null);
  setPickupList([]);
  setDropList([]);
  setShowTripInfo(false);
};
    return (
        <div>
        <div className="flex">
        <div className="w-[40%] mt-10 h-[20%] shadow-lg p-6 bg-amber-100 rounded-lg border-b-black ml-7">
            <h1 className="text-3xl font-extrabold ml-30 text-amber-800">Book your Ride</h1>
            <h3 className="text-2xl text-gray-900 font-serif">Pickup</h3>
                <input value={pickup}
                placeholder="Enter your pickup location"
                className="shadow-lg p-3 bg-amber-50 rounded w-[65%]"
                onChange={(e)=>{
                    setPickup(e.target.value)
                    searchAddress(e.target.value,setPickupList)
                }} />
                <button onClick={getLiveLocation} className="shadow-2xl ml-2 bg-amber-400 p-1 rounded cursor-pointer hover:bg-amber-500 transition">📍mylocation</button><br/>
                {pickupList.map((item,index)=>(
                    <div key={index}
                    onClick={()=>{
                        setPickup(item.formatted);
                        setPickupCoords([item.geometry.lat, item.geometry.lng]);
                        setPickupList([]);
                    }}
                    style={{border: "1px solid #ccc", padding: 5, cursor: "pointer"}}>
                        {item.formatted}
                        </div>
                ))}
                <h3 className="text-2xl text-gray-900 font-serif">Drop</h3>
                <input value={drop} 
                placeholder="Enter your Drop location"
                className="shadow-lg p-3 bg-amber-50 rounded w-[65%]"
                onChange={(e)=>{
                    setDrop(e.target.value)
                    searchAddress(e.target.value,setDropList);
                }} /> <br />
                {dropList.map((item,index)=>(
                    <div
                    key={index}
                    onClick={()=>{
                        setDrop(item.formatted);
                        setDropCoords([item.geometry.lat, item.geometry.lng]);
                        setDropList([]);
                    }}
                    style={{border: "1px solid #ccc", padding: 5, cursor: "pointer"}}>
                        {item.formatted}
                    </div>
                ))}
                <button onClick={handleSubmit} className="cursor-pointer mt-5 bg-amber-500 p-3 rounded text-2xl font-serif ml-20 hover:bg-amber-600 transition">Estimate Fare 💰</button>
         </div>
         <Mapview pickup={pickupCoords} drop={dropCoords} rideId={rideId}/>
         {showTripInfo && (<TripInfo pickup={pickupCoords} drop={dropCoords} pickupAddress={pickup} dropAddress={drop} onClose={handleCloseTrip} onCancel={handleCancelRide} setRideId={setRideId}/>)}
        </div>
        <TripHistory />
        </div>
    )
}