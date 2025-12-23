import React from "react";
import { Link } from "react-router-dom";
import insta from "../assets/insta.png"
import twitter from "../assets/twitter.png"
import facebook from "../assets/facebook.png"


export default function Footer(){
    return (
        <div className="bg-black text-white h-fit">
        <div className="mt-10 flex gap-40 mb-5">
            <div className="ml-20 text-start flex-col mt-20 mb-16">
            <h1 className="text-3xl font-black text-amber-400">ZipRide Caption</h1>
            <ul className="mt-5 ml-20 text-[1.3rem]">
                <li><Link to="/" className="cursor-pointer hover:text-blue-500 w-full mt-5">Home</Link></li>
                <li><Link to="/Booking" className="cursor-pointer hover:text-blue-500 w-full mt-5">Booking</Link></li>
                <li><Link to="/TripHistory" className="cursor-pointer hover:text-blue-500 mt-5">Trip History</Link></li>
                <li><Link to="/Contact" className="cursor-pointer hover:text-blue-500 mt-5">Contact</Link></li>
            </ul>
            </div>
            <div>
                <h1 className="text-white text-3xl font-black mt-20 ml-17">Follow us</h1>
            <div className="flex gap-10 mt-10">
              <img src={insta} alt="" className="h-20 w-20" />
              <img src={facebook} alt="" className="h-18 w-auto" />
              <img src={twitter} alt="" className="h-18 w-auto" />
            </div>
            </div>
        </div>
        <hr />
        <div className="ml-[35%] mt-2 h-16" >
            <h1 className="mt-3">© 2025 ZipRide Transportation. All rights reserved.</h1>
        </div>
        </div>
    )
}