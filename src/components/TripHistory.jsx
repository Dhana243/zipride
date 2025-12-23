import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";


export default function TripHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rides"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRides(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteRide = async (id) => {
  await deleteDoc(doc(db, "rides", id));
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold mb-4 text-amber-900 font-serif ml-[40%]">
        Trip History
      </h3>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-yellow-400 text-gray-900">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Pickup</th>
              <th className="p-3 text-left">Drop</th>
              <th className="p-3 text-left">Distance (km)</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Cost (₹)</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {rides.map((ride, index) => (
              <tr
                key={index}
                className="border-b hover:bg-yellow-50 transition"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{ride.date}</td>
                <td className="max-w-[220px] truncate">{ride.pickup}</td>
                <td className=" max-w-[220px] truncate">{ride.drop}</td>
                <td className="p-3">{ride.distance} km</td>
                <td className="p-3">{ride.duration} mins</td>
                <td className="p-3 font-semibold">₹ {ride.cost}</td>
                <td className="p-4 text-amber-600"><button onClick={()=>{deleteRide(ride.id)}} className="bg-amber-300 cursor-pointer p-1 rounded">Delete</button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
