
const LandingPage = () => {
  return (
    <div className="font-sans antialiased bg-white text-gray-900">
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-700">
            <a href="#" className=" font-bold text-lg text-blue-700 cursor-default">TeleMedicine</a>
          </div>
          <div>
            <a href="#" className="mx-4 text-gray-700 hover:text-lg rounded hover:text-violet-500 ">Home</a>
            <a href="#" className="mx-4 text-gray-700 hover:text-lg rounded hover:text-violet-500">Explore</a>
            <a href="#" className="mx-4 text-gray-700 hover:text-lg rounded hover:text-violet-500">Contact Us</a>
          </div>
          <div>
            <a href="#" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Get Started</a>
          </div>
        </div>
      </div>
    </header>
    <main className="container mx-auto px-6 py-16">
      <div className="flex flex-col items-center lg:flex-row lg:space-x-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            Find &amp; Book <span className="text-blue-500">Appointment</span> with your Fav <span className="text-blue-500">Doctors</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
          </p>
          <a href="#" className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600">Explore Now</a>
        </div>
        <div className="mt-10 lg:mt-0 lg:w-1/2">
          <img src="https://st2.depositphotos.com/3889193/8319/i/450/depositphotos_83196752-stock-photo-confident-doctor-at-hospital-posing.jpg" alt="Doctors" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Search Section */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">Search <span className="text-blue-500">Doctors</span></h2>
      <p className="mt-2 text-lg text-gray-700">Search Your Doctor and Book Appointment in one click</p>
      <div className="mt-4 flex">
        <input type="text" className="w-full px-4 py-2 border rounded-l-lg focus:outline-none" placeholder="Search..." />
        <button className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600">Search</button>
      </div>
    </div>

    {/* Popular Doctors Section */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">Popular <span className="text-blue-500">Doctors</span></h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
    </main>
  </div>
  )
}

export default LandingPage