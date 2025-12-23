import React from "react";
import Swal from 'sweetalert2'


export default function Contact(){

    const onSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(event.target);

    formData.append("access_key", "6c302077-211d-4467-b626-a6487c9d4260");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
      title: "success!",
      text: "Message Sent Successfully!",
      icon: "success"
});
     form.reset();
    }
  };
    return (
        <div className=" min-h-screen flex flex-col items-center justify-center gap-8 px-6 ">
            <h1 className="font-bold text-6xl max-w-3xl mt-15">Chat with us</h1>
            <p className="font-light text-2xl max-w-4xl text-center">We are eager to hear from you if you have any queries about what we do or you would like to talk to us about working with you in any areas of our business.</p>
            <form className="bg-white w-[40%] h-full p-8 rounded-xl shadow-lg text-[1.05rem] space-y-4 border-2" onSubmit={onSubmit}>
                <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Contact us</h2>
                <div>
                    <label className="block text-left font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required
                    className="w-full px-3 py-2 rounded-md border border-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-amber-400"/>
                </div>
                <div>
                    <label className="block text-left font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" placeholder="Enter your email id" required
                    className="w-full px-3 py-2 rounded-md border border-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-amber-400"/>
                </div>
                <div>
                    <label className="block text-left font-medium text-gray-700 mb-1">Message</label>
                    <textarea type="message" placeholder="your message" name="message"
                    className="w-full px-3 py-1 h-27 rounded-md border border-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-amber-400"></textarea>
                </div>
                <button type="submit"
                className="w-full mt-4 bg-black text-white py-2 rounded-md 
                   font-medium hover:bg-gray-800 transition duration-200 cursor-pointer">Send Message</button>
            </form>
        </div>
    )
}