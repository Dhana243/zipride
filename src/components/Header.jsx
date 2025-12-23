import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {signOut} from "firebase/auth"
import { auth } from "../firebase";



export default function Header({user,setUser}){
    const handleLogout = async ()=>{
        try{
            await signOut(auth);
            alert("you are Logged out successfully")
            setUser("Guest")
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <div className="bg-black">            
            <h2 className=" ml-[86%] w-fit font-medium text-2xl text-white">Hello {user}</h2>
            </div>
        <div className="flex justify-between px-8 py-3 items-center bg-black text-white">
                <h1 className="text-5xl font-black text-amber-400">ZipRide</h1>
                <Navbar />
                                <Link to="/Signup" className="text-white font-medium cursor-pointer hover:text-blue-500 w-fit bg-[#9ACD32] p-1 rounded ml-[30%] ">Signup</Link>
                <Link to="/Login" className="text-white font-medium cursor-pointer hover:text-blue-500 " >Login</Link>
                <button className="text-white font-medium cursor-pointer hover:text-blue-500"
                onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}