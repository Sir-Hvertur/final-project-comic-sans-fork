"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserEventList from "@/components/user-event-list";
import Button from "@/components/ui/button";
import GradientCurve from "@/components/gradientcurve";
import AllEventList from "@/components/all-events-list";

const LoginSite = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Check if user is logged in
  const checkSession = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/check_session/";
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Include cookies for session handling
      });
      const data = await response.json();

      if (data.status === "success") {
        setUser(data.user);
        // Now fetch events
        fetchEvents();
      } else {
        // Redirect to login page if not logged in
        router.push("/login");
      }
    } catch (err) {
      console.error("Error checking session:", err);
      router.push("/login");
    }
  };

  const fetchEvents = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/events/";
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // Include cookies for session handling
      });
      const data = await response.json();

      if (data.status === "success") {
        setEvents(data.events);
      } else {
        setError(data.message || "Failed to fetch events.");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("An error occurred while fetching events.");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/logout/";
    await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUser(null); // Clear user state
    router.push("/login"); // Redirect to login page
  };

  if (!user) {
    return null; // Render nothing if user is not logged in
  }

  return (
    <main className="pt-20">
      <section className="bg-gradient-to-r from-gradientstart to-gradientend"></section>
      <GradientCurve className={"max-h-24"}>
        <div className="max-w-6xl mx-auto flex">
          <h1 className="font-bold text-2xl mx-auto max-w-6xl pb-12 text-white">
            Hello, {user.name}
          </h1>
        </div>
      </GradientCurve>
      <section className="max-w-6xl mx-auto">
        <UserEventList maxEvents={6}></UserEventList>
        <AllEventList maxEvents={6}></AllEventList>
      </section>
    </main>
  );
};

export default LoginSite;
