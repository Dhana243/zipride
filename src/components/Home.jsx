import React from "react";
import ride1 from "../assets/ride1.jpg"
import ride2 from "../assets/ride2.jpg"
import ride3 from "../assets/ride3.jpg"
import ride4 from "../assets/ride4.jpg"
import { Link } from "react-router-dom";
import city from "../assets/city.png"
import graph from "../assets/graph.png"
import light from "../assets/light.png"
import taxi from "../assets/taxi.jpg"
import phone from "../assets/phone.jpg"
import logo from "../assets/logo.jpg"

export default function Home(){
    return (
      <div>
        <div className="flex w-full bg-black">
            <div className="w-3/4 p-4">
  <div className="grid grid-cols-2 gap-4 mt-5">
    <img src={ride1} className="w-full h-62 object-cover rounded-lg" />
    <img src={ride2} className="w-full h-62 object-cover rounded-lg" />
    <img src={ride3} className="w-full h-62 object-cover rounded-lg" />
    <img src={ride4} className="w-full h-62 object-cover rounded-lg" />
  </div>
  </div>
  <div className="mt-35">
    <h1 className="text-6xl font-extrabold ml-16 text-shadow-initial  text-white text-center">Seamless Ride Experiences</h1>
    <p className="mt-8 w-96 ml-35 font-light text-white text-center">Discover the ease of live tracking, precise fair estimates, detailed trip logs. Reliable and efficient for every journey. </p>
    <button style={{ font: "message-box", backgroundColor: "yellowgreen", padding: "5px", borderRadius: "10px", fontSize: "25px", height: "50px", width: "150px", marginTop: "10px", marginLeft: "40%", color: "white"}}>
    <Link to="/Booking" className="cursor-pointer hover:text-blue-500 w-full">Let’s Ride</Link>    </button>
  </div>
    </div>
    <h1 className="text-5xl w-[70%] ml-50 mt-32 text-center text-shadow-initial font-bold">Global mobility ecosystem driving communities forward</h1>
    <div className="flex ml-48 gap-36 mt-12">
      <div className="w-52 bg-amber-100 text-center p-2 rounded">
        <img src={city} alt="city" className="h-40 w-auto ml-3" />
        <h1 className="font-medium text-4xl ml-5">250+</h1>
        <h1 className="font-medium text-2xl">Cities covered</h1>
        <p className="font-light">Across India, Australia, New Zealand and the UK</p>
      </div>
      <div className="w-52 bg-amber-100 text-center p-2 rounded">
        <img src={graph} alt="graph" className="h-40 w-auto ml-3" />
        <h1 className="font-medium text-4xl ml-5">55 Cr+</h1>
        <h1 className="font-medium text-2xl">Yearly rides</h1>
        <p className="font-light">Booked by our customers every year</p>
      </div>
      <div className="w-52 bg-amber-100 text-center p-2 rounded">
        <img src={light} alt="light" className="h-35 mt-5 w-auto ml-8" />
        <h1 className="font-medium text-4xl ml-5">12 Cr+</h1>
        <h1 className="font-medium text-2xl">Kilometers on S1</h1>
        <p className="font-light">Distance covered within a year of launch</p>
      </div>
    </div>
    <div className="flex mt-28 ml-5">
    <div className="w-[50%] ">
      <h1 className="font-bold underline mt-5 decoration-amber-300 text-5xl text-balance">Safety for all</h1>
      <p className="mt-8 text-2xl font-sans text-justify">At ZipRide, your safety is our top priority, and every ride is designed to be secure and comfortable. With real-time tracking, verified drivers, and transparent pricing, we ensure reliable and worry-free journeys. From pickup to drop, ZipRide delivers a smooth, safe, and stress-free travel experience you can trust.</p>
    </div>
      <img src={taxi} alt="taxi" className="w-[40%] ml-10 rounded-2xl" />
    </div>
     <div className="flex ml-70 gap-5 mt-28 h-auto">
      <img src={phone} alt="phone" className="h-[50%] w-[35%] rounded-2xl" />
      <div className="w-[30%] ">
        <h1 className="font-bold text-5xl text-black drop-shadow-[2px_2px_0_gold]">Making innovations since 2011</h1>
        <div>
          <h1 className="font-medium text-3xl mt-2">For Riders</h1>
          <p className="text-[1.2rem] text-justify mt-3 text-shadow-white font-light">We constantly experiment to come up with industry-first features for our riders that eventually become a norm.</p>
        </div>
        <div>
          <h1 className="font-medium text-3xl mt-2">For Drivers</h1>
          <p className="text-[1.3rem] text-justify mt-3 text-shadow-white font-light">Our drivers get real time stats to help optimize their rides better and earn more, straight from the app.</p>
        </div>
      </div>
      </div>
      <div className="bg-black text-white mt-20 h-96">
        <h1 className="text-5xl underline decoration-amber-400 text-center">Dowload Now</h1>
        <div className="flex items-center ml-[33%] gap-20 text-center mt-20">
          <div>
            <img src={logo} alt="logo" className="h-28 w-28 rounded-2xl ml-7" />
            <h1 className="text-2xl font-black text-amber-400">ZipRide</h1>
            <p className="text-3xl font-medium">Book & Ride</p>
          </div>
          <div>
            <img src={logo} alt="logo" className="h-28 w-28 rounded-2xl ml-10" />
            <h1 className="text-2xl font-black text-amber-400">ZipRide Caption</h1>
            <p className="text-3xl font-medium">Drive & Earn</p>
          </div>
        </div>
      </div>
    </div>
    )
}