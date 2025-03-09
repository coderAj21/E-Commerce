import React from "react";

const AboutUs = () => {
  return (
    <div className="font-sans">
      {/* About Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600 mb-8">
            We are a team of passionate individuals dedicated to delivering
            excellence.
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* About Text */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2025, we started as a small team with a big dream.
                Over the years, we've grown into a trusted name in our industry,
                delivering innovative solutions to our clients.
              </p>
              <p className="text-gray-700">
                Our mission is to empower businesses and individuals through
                cutting-edge technology and creative thinking.
              </p>
            </div>

            {/* About Image */}
            <div className="flex-1">
              <img
                src="/assets/group_pic.jpg"
                alt="Our Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col gap-y-1 items-center">
              <img
                src="/assets/aayush_profile_pic.jpg"
                alt="Team Member 1"
                className="rounded-full w-[300px] aspect-square object-cover object-center"
              />
              <h3 className="text-xl font-bold">Aayush Gahalwar</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col gap-y-1 items-center">
              <img
                src="/assets/ashu_profile_pic.jpg"
                alt="Team Member 2"
                className="rounded-full w-[300px] aspect-square object-cover object-center"
              />
              <h3 className="text-xl font-bold">Ashutosh Joshi</h3>
              <p className="text-gray-600">CTO & Tech Advisor</p>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col gap-y-1 items-center">
              <img
                src="/assets/gaurav_profile_pic.jpg"
                alt="Team Member 3"
                className="rounded-full w-[300px] aspect-square object-cover object-center"
              />
              <h3 className="text-xl font-bold">Gaurav Chandra Nainwal</h3>
              <p className="text-gray-600">CIO & Managing Head</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
