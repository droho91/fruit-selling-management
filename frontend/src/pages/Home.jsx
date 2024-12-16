// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { motion } from 'framer-motion'; // Import Framer Motion

const Home = () => {
  const navigations = [
    { name: 'Menu', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'About Us', href: '/about' }, // Updated href
  ];

  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8800")
      .then(res => {
        if (res.data.status === "Successful") {
          setAuth(true);
          setUsername(res.data.name);
        } else {
          setAuth(false);
          // Optional: Provide more descriptive error messages
          console.error("Authentication failed:", res.data.message);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogOut = () => {
    axios.get("http://localhost:8800/logout")
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="font-poppins relative bg-white overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10">
        <nav className="flex items-center justify-between px-10 py-6 fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
          {/* Logo */}
          <div className="flex flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
              <img
                  alt="Fruit House Logo"
                  src="./assets/mangosteen.png"
                  className="h-8 w-auto"
              />
              <p className="text-xl font-bold text-purple-700">FruitHouse</p>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex gap-x-12">
            {navigations.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900 hover:text-purple-400 transition-colors">
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {auth ? (
              <div className="flex items-center justify-center gap-3">
                <p className="text-lg font-medium text-gray-700">{username}</p>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-200">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt="User Profile"
                        src="./assets/pfp.jpg"
                        className="h-8 w-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <MenuItem>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <div
                        onClick={handleLogOut}
                        className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      >
                        Log Out
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            ) : (
              <a href="/login" className="text-sm font-semibold text-gray-900 hover:text-purple-500 transition">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-8 py-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <section className="flex flex-col md:flex-row items-center justify-between px-8">
          {/* Left Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-purple-800 text-6xl font-bold">
              Fruits from the <span className="text-purple-500">Homeland</span>
            </h1>
            <p className="text-gray-700 mt-4 text-lg">
              Indulge in nature's finest with our premium selection of fresh fruits,
              delivering exceptional taste and sweetness.
            </p>
            <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700">
              <a href="/products">Visit the Menu</a>
            </button>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 mt-8 md:mt-0 relative">
            <img
              src="./assets/fruitsHome.png"
              alt="Coffee Cup"
              className="w-full rounded-lg"
            />
          </div>
        </section>
      </div>

      {/* Categories Section */}
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="text-purple-800 text-5xl font-bold m-auto text-center">Visit the Categories</h2>
          {/* Coffee */}
          <section className="flex flex-col md:flex-row items-center justify-between px-8">
            {/* Left Section */}
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-purple-800 text-5xl font-bold">
                Berries
              </h3>
              <p className="text-gray-700 mt-4 text-lg">
                A type of fleshy fruit where the entire pericarp (fruit wall) is soft, and they usually contain multiple seeds.
              </p>
              <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105">
                <a href="/products">Visit the Menu</a>
              </button>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <img
                src='./assets/berries.png'
                alt="Coffee"
                className="w-full rounded-lg"
              />
            </div>
          </section>

          {/* Tea */}
          <section className="flex flex-col md:flex-row items-center justify-between px-8">
            {/* Left Section */}
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <img
                src='./assets/citrus.png'
                alt="Tea"
                className="w-full rounded-lg"
              />
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-purple-800 text-5xl font-bold">
                Citrus
              </h3>
              <p className="text-gray-700 mt-4 text-lg">
                A group of fruits that belong to the genus Citrus in the Rutaceae family. They are characterized by their thick, leathery rind (peel), segmented flesh, and a juicy, tangy-sweet flavor due to their high citric acid content.
              </p>
              <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105">
                <a href="/products">Visit the Menu</a>
              </button>
            </div>
          </section>
      </div>

      {/* About Section */}
      <div className="mx-auto max-w-7xl px-8 py-10">
        <h2 className="text-purple-800 text-5xl font-bold m-auto text-center">About Us</h2>
          {/* Coffee */}
          <section className="flex flex-col md:flex-row items-center justify-between px-8 py-14">
            {/* Left Section */}
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-purple-800 text-5xl font-bold">
                Our Store
              </h3>
              <p className="text-gray-700 mt-4 text-lg">
                A place full of fruits.
              </p>
              <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700">
                <a href="/products">Find Out</a>
              </button>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <img
                src='./assets/aboutUs.jpg'
                alt="Coffee"
                className="w-full rounded-lg"
              />
            </div>
          </section>
        </div>

      <Footer />
    </div>
  );
};

export default Home;
