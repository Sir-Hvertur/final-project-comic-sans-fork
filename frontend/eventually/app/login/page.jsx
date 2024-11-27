"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../authcontext";
import GradientCurve from "../../components/gradientcurve";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/login";

  // Login function
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include", // Include cookies for session handling
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "success") {
        console.log("Login successful");
        setUser(data.user); // Update the global user state
        router.push("/dashboard"); // Redirect to dashboard or desired page
      } else {
        console.error("Login failed:", data.message);
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gradientstart to-gradientend pb-0">
        <section className="mx-auto flex flex-col justify-center items-center pt-32">
          <section className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Login
              </button>
            </form>
          </section>
        </section>
      </div>
      <GradientCurve />
    </>

    // <main className="relative min-h-screen flex flex-col items-center justify-center">
    //   {/* Content Section */}
    //   <section className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
    //     <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
    //       Login
    //     </h1>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Email:
    //         </label>
    //         <input
    //           type="text"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Password:
    //         </label>
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 text-gray-700"
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
    //       >
    //         Login
    //       </button>
    //     </form>
    //   </section>
    // </main>
  );
};

export default LoginPage;
