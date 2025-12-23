import React from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const Login = ({ user, setUser })=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin= async (e)=>{
        e.preventDefault();

        try{
              const userCredential = await signInWithEmailAndPassword(auth,email,password);
               const docRef = doc(db, "users", userCredential.user.uid);
               const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
        setUser(docSnap.data().username);
      }
      // alert("Login successful ✅");
      Swal.fire({
            title: "success!",
            text: "Login successful! Welcome back.",
            icon: "success"})
      navigate("/");
              
        } catch (error){
            console.log(error);
            alert(error);
        }

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-amber-200 w-[30%] p-8 rounded-xl shadow-lg text-[1.05rem]">

    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
      Login
    </h2>

    <form onSubmit={handleLogin} className="space-y-4">

      {/* Email */}
      <div>
        <label className="block text-left font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-left font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full mt-4 bg-black text-white py-2 rounded-md
                   font-medium hover:bg-gray-800 transition duration-200"
      >
        Login
      </button>

      {/* Optional Signup link */}
      <p className="text-center text-gray-700 mt-3 text-sm">
        Don't have an account? 
        <a href="/Signup" className="text-amber-600 hover:underline ml-1">Create Account</a>
      </p>
    </form>
  </div>
</div>

    )
}
export default Login;