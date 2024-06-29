import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="font-sans antialiased bg-white text-gray-900">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">
              <Link to="/" className="font-bold text-lg text-blue-700">TeleMedicine</Link>
            </div>
            <div>
              <Link to="/" className="mx-4 text-gray-700 hover:text-lg rounded hover:text-violet-500 underline underline-offset-8">Home</Link>
              <Link to="/explore" className="mx-4 text-gray-700 hover:text-lg rounded hover:text-violet-500">Explore</Link>
              <Link to="/contact" className="mx-4 text-gray-700 hover:text-lg rounded hover:text-violet-500">Contact Us</Link>
            </div>
            <div>
              <Link to="/signup" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Get Started</Link>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-16">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
