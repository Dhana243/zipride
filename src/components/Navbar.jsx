import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <nav className="flex justify-between items-center p-7 text-amber-400 ">
            <ul className="flex justify-center items-center gap-7  font-medium text-justify">
                <li><Link to="/" className="cursor-pointer hover:text-blue-500 w-full">Home</Link></li>
                <li><Link to="/Booking" className="cursor-pointer hover:text-blue-500 w-full">Booking</Link></li>
                <li><Link to="/TripHistory" className="cursor-pointer hover:text-blue-500 w-full">TripHistory</Link></li>
                <li><Link to="/Contact" className="cursor-pointer hover:text-blue-500 w-full">Contact</Link></li>

            </ul>
        </nav>
    )
}