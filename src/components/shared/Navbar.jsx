"use client"; // Mark this file as a client component

import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SearchField from "@/app/components/shared/SearchFilter";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the mobile menu
  const [profileHovered, setProfileHovered] = useState(false); // State to track hover over profile icon
  const [isSticky, setIsSticky] = useState(false); // State for sticky header
  
  // Function to handle scroll event and change header style
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true); // Apply sticky class when scroll position is greater than 0
    } else {
      setIsSticky(false); // Remove sticky class when at the top
    }
  };

  // Add scroll event listener on component mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`bg-white shadow-md ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''} transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/assets/logo.png" // Replace with your logo path
              alt="Logo"
              width={70}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="space-x-4">
        <SearchField/>
        </div>

        {/* Navigation Menu for Desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/">
            <span className="relative text-gray-700 hover:text-blue-500 transition">
              Home
            </span>
          </Link>
          <Link href="#about">
            <span className="relative text-gray-700 hover:text-blue-500 transition">
              About
            </span>
          </Link>
          <Link href="tours">
            <span className="relative text-gray-700 hover:text-blue-500 transition">
              Tour
            </span>
          </Link>
          <Link href="#blog">
            <span className="relative text-gray-700 hover:text-blue-500 transition">
              Blog
            </span>
          </Link>
          
          <Link href="#contact">
            <span className="relative text-gray-700 hover:text-blue-500 transition">
              Contact
            </span>
          </Link>
        </nav>

        {/* Icon Section */}
        <div className="flex items-center space-x-6">
          
          <div className="relative group">
            <button className="text-xl text-gray-700 hover:text-blue-500">
              <FaHeart />
            </button>
          </div>
          <div className="relative group">
            <button className="text-xl text-gray-700 hover:text-blue-500">
              <FaShoppingCart />
            </button>
          </div>

          {/* Profile Icon with Popup */}
          <div
            className="relative"
            onMouseEnter={() => setProfileHovered(true)} // Show popup on hover
            onMouseLeave={() => setProfileHovered(false)} // Hide popup on leave
          >
            <button className="text-xl text-gray-700 hover:text-blue-500">
              <FaUser />
            </button>

            {/* Profile Popup */}
            {profileHovered && (
              <div className="absolute top-full mt-2 right-0 w-[420px] h-[420px] bg-white shadow-lg p-4 rounded-md z-10">
                <h3 className="text-xl font-semibold mb-4">Profile</h3>
                <button className="flex items-center gap-2 hover:opacity-100 transition-opacity duration-300 mb-4 text-blue-500">
                  <FaSignInAlt />
                  Sign In / Sign Up
                </button>
                <div className="flex items-center gap-2 mb-4">
                  <select className="border px-2 py-1 rounded">
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <select className="border px-2 py-1 rounded">
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-xl text-gray-700 hover:text-blue-500"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide in from Right */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-40 transform translate-x-0 transition-all duration-300">
          <nav className="flex flex-col items-center py-4">
            <Link href="/">
              <span className="text-gray-700 py-2 hover:text-blue-500 transition">Home</span>
            </Link>
            <Link href="#about">
              <span className="text-gray-700 py-2 hover:text-blue-500 transition">About</span>
            </Link>
            <Link href="#services">
              <span className="text-gray-700 py-2 hover:text-blue-500 transition">Services</span>
            </Link>
            <Link href="#contact">
              <span className="text-gray-700 py-2 hover:text-blue-500 transition">Contact</span>
            </Link>
          </nav>
        </div>
      )}

      {/* Overlay for closing the menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}
