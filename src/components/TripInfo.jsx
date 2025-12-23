import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import {startLiveTracking,stopLiveTracking} from "../components/LiveTracking"

export default function TripInfo({pickup,drop, onClose, pickupAddress, dropAddress, onCancel, setRideId}){
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
    const [cost, setCost] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(()=>{
        if (!pickup || !drop) return;

        const fetchRouteInfo = async ()=>{
            const url = `https://router.project-osrm.org/route/v1/driving/${pickup[1]},${pickup[0]};${drop[1]},${drop[0]}?overview=false`;

            const res = await fetch(url);
            const data = await res.json();
            const route = data.routes[0];

            setDistance((route.distance/1000).toFixed(2));
            // Duration 
            const totalMinutes = Math.round(route.duration / 60);

            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            let timeText = "";

            if (hours > 0 && minutes > 0) {
                timeText = `${hours} hr ${minutes}`;
            } else if (hours > 0) {
                timeText = `${hours} hr`;
            } else {
                timeText = `${minutes}`;
            }
            setDuration(timeText);  
            
        // cost calculation
        const km = route.distance / 1000;
        const totalMins = Math.round(route.duration / 60);

        const baseFare = 15;           
        const perKmRate = 5;           
        const perMinRate = 0.5;

        const distanceCost = km * perKmRate;
        const timeCost = totalMins * perMinRate;
        const totalCost = Math.round(baseFare + distanceCost + timeCost);
            
        setCost(totalCost);
        setIsConfirmed(false);
        }
        fetchRouteInfo();},[pickup,drop])
        // confirmRide
        const confirmRide = async () => {
              const docRef = await addDoc(collection(db, "rides"), {
                pickup: pickupAddress,
                drop: dropAddress,
                distance,
                duration,
                cost,
                date: new Date().toLocaleString(),
              });

               setRideId(docRef.id);     
              startLiveTracking(docRef.id);
               setIsConfirmed(true);
              };
    return(
        <div className="fixed mt-30 z-1000 ml-96 bg-linear-to-br from-yellow-400 via-orange-400 to-orange-600 p-3 rounded-2xl shadow-2xl shadow-yellow-500/40 border border-yellow-300/50 w-125" >
        <div className="flex ml-35">
        <h4 className="text-2xl font-bold text-emerald-700 block mb-2 font-serif">Trip Details</h4>
        <button onClick={onClose} className="bg-amber-300 h-7 rounded  cursor-pointer ml-32"> ❌</button>
        </div>
        <p className="text-gray-900 text-lg font-semibold mb-4"><b className="text-2xl font-serif text-gray-900 mb-1">Distance:</b> {distance} km</p>
        <p className="text-gray-900 text-lg font-medium mb-6"><b className="text-2xl font-serif text-gray-900 mb-1">Duration:</b> {duration} mins</p>
        <p className="text-2xl font-semibold text-gray-900 block mb-2"><b className="text-2xl font-serif text-gray-900 mb-1">Total Cost:</b> ₹ {cost}</p>
        <button onClick={onCancel}
        className="w-full mt-3 bg-red-600 text-white text-lg font-bold py-2 rounded-xl hover:bg-red-700 transition">Cancel Ride</button>
        {!isConfirmed ? (
        <button
          onClick={confirmRide}
          className="w-full bg-green-600 text-white text-lg font-bold py-2 rounded-xl hover:bg-green-700 transition"
        >
          Confirm Ride
        </button>
      ) : (
        <p className="text-center text-xl font-bold text-green-900 mt-4">
          ✅ Your ride is confirmed 🚗
        </p>
      )}
    </div>
    )
}