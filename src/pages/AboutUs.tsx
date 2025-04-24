const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <img
          src="https://i.postimg.cc/DftxKbMx/download.jpg"
          alt="About Hero"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            About Us
          </h1>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At Lolo Chicki Cars, our mission is to revolutionize the way people
            buy and sell cars. We believe in simplicity, transparency, and
            community-driven experiences.
          </p>
        </div>
        <img
          src="https://i.postimg.cc/C5jSRDWZ/11452734.png"
          alt="Mission"
          className="rounded-2xl shadow-md"
        />
      </div>

      {/* Our Story */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://i.postimg.cc/C5jSRDWZ/11452734.png"
            alt="Our Story"
            className="rounded-2xl shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg leading-relaxed">
              Founded by car lovers, we started Lolo Chicki with a vision to
              create a platform where trust, tech, and passion collide. From
              humble beginnings, we’ve built a community-focused marketplace
              that empowers every driver.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
