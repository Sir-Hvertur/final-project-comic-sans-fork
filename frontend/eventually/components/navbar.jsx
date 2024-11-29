"use client";
import Link from "next/link";
import Button from "../components/button";
import ProfileAvatar from "../components/profile-avatar";
import { AuthContext } from "../app/authcontext";
import { useContext } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, loading } = useContext(AuthContext);
  const pathname = usePathname();

  // Determine current page
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  return (
    <nav className="flex justify-between items-center px-20 py-5 text-white bg-gradient-to-r from-gradientstart to-gradientend fixed top-0 left-0 w-full z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.svg" alt="Eventually" width={40} height={40} />
          {!isHomePage && (
            <h1 className="font-dancing-script text-3xl">Eventually</h1>
          )}
        </Link>
      </div>
      {/* Right Side: Links */}
      <div className="flex gap-10 items-center">
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          // Render this if the user is logged in
          <>
            <ProfileAvatar />
            <Link href="/createEvent">
              <Button label="CREATE EVENT" className="m-10" />
            </Link>
          </>
        ) : (
          // Render this for home, login, and signup pages
          <>
            <Link
              href="/login"
              className={`flex items-center w-20 whitespace-nowrap ${isLoginPage ? "font-bold" : ""
                }`}
            >
              LOGIN
            </Link>
            <Link
              href="/signup"
              className={`flex items-center w-20 whitespace-nowrap ${isSignupPage ? "font-bold" : ""
                }`}
            >
              SIGN UP
            </Link>

            <Link href="/createEvent">
              <Button label="CREATE EVENT" className="m-10" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
