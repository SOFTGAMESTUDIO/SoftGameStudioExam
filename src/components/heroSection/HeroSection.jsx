import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString());
  }, []);

  return (
    <section className="bg-gray-950 text-white py-20 overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 gap-12">

        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 w-full space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Welcome to Soft Game Studio Exam Portal
          </h1>

          <p className="text-lg leading-relaxed text-gray-300">
            🎯 Whether you're a beginner or a seasoned developer, our platform is your one-stop destination for mastering programming through hands-on learning and guided certifications.
          </p>

          <div className="space-y-4 text-base">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <p>📘 <span className="text-cyan-400 font-semibold">Programming Notes:</span> Simplified guides and quick references for fast learning.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <p>💻 <span className="text-cyan-400 font-semibold">Source Code:</span> Real examples with instant implementation and practice.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <p>📂 <span className="text-cyan-400 font-semibold">Projects:</span> Useful for college submissions, portfolios, and practical growth.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <p>🎥 <span className="text-cyan-400 font-semibold">Tutorials:</span> Step-by-step learning with video support for every topic.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <p>🔗 <span className="text-cyan-400 font-semibold">Resources:</span> Curated content, external links, and real-world examples.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-blue-500"
          >
            <p className="text-green-400 font-semibold text-lg">
              🆓 Free & 💰 Premium Exams
            </p>
            <p className="text-sm text-gray-400 mt-2">
              🎖 Earn Verified Certificates<br />
              📦 Win Exciting Prizes<br />
              ⏳ Timed Practice Mode<br />
              💡 MCQs, Coding, and Theory Tests
            </p>
          </motion.div>

          <a
            href="https://softgamestudio.web.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 text-white rounded-lg font-semibold text-lg shadow-lg mt-4"
          >
            View Exam Schedule & Results
          </a>
        </motion.div>

        {/* Right: Image Collage */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-1/2 w-full grid grid-cols-2 gap-4"
        >
          <img
            className="h-48 w-full object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCeTz0GQDPR1azBcu9C8v4BSP-hUpDo7GExQ&s"
            alt="student coding"
          />
          <img
            className="h-48 w-full object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkyHGIO2yWmbxzIZu5-Xx0_cEdiAPA5J51Wc1mIyOgpMdP8lQs8-9O9HGhOhcSB-TraI&usqp=CAU"
            alt="students learning"
          />
          <img
            className="h-48 w-full object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
            src="https://cdn.prod.website-files.com/65159e844f8f08a72cefa2b0/65159e844f8f08a72cefa54b_65122f02e60199833957e1f8_istockphoto-1147195672-612x612.jpeg"
            alt="classroom programming"
          />
          <img
            className="h-48 w-full object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
            src="https://i.kinja-img.com/image/upload/c_fill,h_900,q_60,w_1600/2cf1380a2e78953c873bec87fa089a38.jpg"
            alt="students coding"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
