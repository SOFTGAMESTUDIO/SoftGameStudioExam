import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../../components/layout/Layout";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE__EMAILJS_SERVICEID;
    const templateID = import.meta.env.VITE__EMAILJS_TEMPLATEID;
    const publicKey = import.meta.env.VITE__EMAILJS_PUBLICKEY;

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "",subject: "", message: "" });
      })
      .catch(() => {
        setStatus("Failed to send message. Please try again.");
      });
  };

  return (
    <Layout>
      <section className="text-gray-300 body-font relative bg-gray-900">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          {/* Map Section */}
          <div className="lg:w-2/3 md:w-1/2 bg-gray-800 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Nai%20Abadi,%20Abohar,%20Punjab&ie=UTF8&t=&z=14&iwloc=B&output=embed"
              style={{ filter: "grayscale(1) contrast(1.2) opacity(0.6)" }}
            ></iframe>
            <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1 text-gray-400">
                  House No. 574, Street No: 5, Nai Abadi, Abohar, Punjab,
                  152116, India
                </p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-bold text-white tracking-wider text-xs">
                  SERVICE TIME
                </h2>
                <a className="text-blue-400 hover:underline">
                  9:00 Am to 5:00 Pm
                </a>
                <h2 className="title-font font-bold text-white tracking-wider text-xs">
                  EMAIL
                </h2>
                <a
                  href="mailto:team.softgamestudio@gmail.com"
                  className="text-blue-400 hover:underline"
                >
                  team.softgamestudio@gmail.com
                </a>
                <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                

                <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                  GOOGLE BUSINESS PROFILE
                </h2>
                <a
                  href="https://g.co/kgs/HWfapjM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:w-1/3 md:w-1/2 bg-gray-800 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-8 rounded-lg shadow-md">
            <h2 className="text-white text-lg mb-1 font-medium title-font">
              Contact Us
            </h2>
            <p className="leading-relaxed mb-5 text-gray-400">
            To contact us, please fill in the following details and submit the form.
            </p>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none text-gray-300 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter your name"
                  required
                />
              </div>
              {/* Email Field */}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none text-gray-300 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* subject Field */}
              <div className="relative mb-4">
                <label
                  htmlFor="subject"
                  className="leading-7 text-sm text-gray-400"
                >
                  subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base outline-none text-gray-300 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter your subject"
                  required
                />
              </div>
              {/* Message Field */}
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 h-32 text-base outline-none text-gray-300 py-2 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  placeholder="Type your message"
                  required
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                Submit
              </button>
            </form>
            {status && (
              <p
                className={`text-sm mt-3 ${
                  status.startsWith("Message sent")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
