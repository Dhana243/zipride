import React from "react";
import { useState } from "react";
import {auth, db} from "../firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2'


const Signup = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername] = useState('');

    const navigate = useNavigate();

    const handleSignup= async (e)=>{
        e.preventDefault();

        try{
          const userCredential = await createUserWithEmailAndPassword(auth,email,password)
          await setDoc(doc(db,"users",userCredential.user.uid),{username,email})
          // alert("Account created successfully. Please login");
          Swal.fire({
      title: "success!",
      text: "Account created successfully! Please log in to continue",
      icon: "success"})
          navigate("/Login");
        } catch(error){
            console.log(error);
            alert(error)
        }

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-amber-200 w-[30%] p-8 rounded-xl shadow-lg text-[1.05rem]">
    
    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
      Signup
    </h2>

    <form onSubmit={handleSignup} className="space-y-4">

      <div>
        <label className="block text-left font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      <div>
        <label className="block text-left font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      <div>
        <label className="block text-left font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-black text-white py-2 rounded-md 
                   font-medium hover:bg-gray-800 transition duration-200 cursor-pointer"
      >
        Create Account
      </button>
    </form>
  </div>
</div>
    )

}
export default Signup;