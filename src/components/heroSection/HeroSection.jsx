import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Certificate from "../Certificate/Certificate";

function HeroSection() {
  const [date, setDate] = useState("");

    useEffect(() => {
        setDate(new Date().toLocaleDateString()); // Formats the date properly
    }, []); // Runs only on mount
  return (
    <div className=" slide-container ">
      <div className=" items-center h-full text-gray-100">
        <div className="w-full bg-no-repeat bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Hero%20Section%2Fpexels-luis-gomes-166706-546819.jpg?alt=media&token=e32fce6c-8ef8-4a23-8b15-cccd4a3ce02b')]">
        <div className="bg-gray-900 text-white min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-cyan-400">Welcome to Soft Game Studio Exam Portal</h1>
          <p className="mt-2 text-lg text-gray-300">
            Powered by Soft Game Studio – Your trusted platform for programming education and skill-based certifications.
          </p>
        </header>

        <section className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-400">About Soft Game Studio</h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-200">
            <li>📘 Programming Notes – Simplified guides for multiple languages</li>
            <li>💻 Source Code – Ready-to-use coding examples</li>
            <li>📂 Projects – Ideal for college submissions and personal growth</li>
            <li>🎥 Video Tutorials – Step-by-step practical lessons</li>
            <li>🔗 Practical Resources – Real-world examples and helpful references</li>
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-green-400">Soft Game Studio Online Exams</h2>
          <p className="mt-2 text-gray-200">We conduct online exams categorized into:</p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-200">
            <li>🆓 <strong>Free Exams</strong> – Learn and participate without any charges</li>
            <li>💰 <strong>Priced Exams</strong> – Premium certifications with exciting rewards</li>
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400">After Exam Completion</h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-200">
            <li>🎖️ Digital Participation Certificate to all candidates</li>
            <li>📦 Prizes delivered via courier to your provided address</li>
            <li>📲 WhatsApp updates on results & shipping status</li>
            <li>🌐 More info available on our website</li>
          </ul>
        </section>

        <section className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-400">Exam Schedule & Results</h2>
          <p className="mt-2 text-gray-200">
            🗓️ All exam dates, events, and result announcements will be updated at:
          </p>
          <a
            href="https://softgamestudio.web.app"
            className="text-cyan-300 underline mt-2 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://softgamestudio.web.app
          </a>
        </section>

        <footer className="text-center mt-10">
          <h3 className="text-xl text-cyan-400 font-semibold">Join us today and start your journey!</h3>
          <p className="text-gray-300 mt-2">
            Make your mark with knowledge, confidence, and certification from Soft Game Studio.
          </p>
        </footer>
      </div>
    </div>
        </div>
        {/* <div className='h-full  overflow-scroll text-black'>
                
                <Certificate name="Livesh Kumar" course="BCA" rollNo="250001" examName="Python" date={date} />
        </div> */}
        <section
          className="bg-no-repeat bg-cover  bg-center "
          style={{
            backgroundImage:
              "url('https://img.pikbest.com/wp/202408/program-code-3d-rendering-of-abstract-purple-coding-background-with-mock-up-and-big-data-illuminating-the-concept-programming_9762612.jpg!sw800')",
          }}
        >
          <div className="w-full  px-5 py-10  bg-black/80">
            <h1 className=" text-center text-3xl font-bold text-white">
              SOFT GAME STUDIO
            </h1>
            <h2 className=" text-center text-2xl font-semibold mb-10 text-white">
              OUR TEAM<span className=" text-indigo-400"> MEMBERS </span>
            </h2>
            <div className="flex justify-center flex-wrap ">
              <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center">
                  <img
                    alt="testimonial"
                    className=" w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2FSnapchat-467264900.jpg?alt=media&token=a1f217d0-2444-47d1-8e40-7d69b43a970d"
                  />
                  <p className=" leading-relaxed text-cyan-400">
                    SENIOR DEVELOPER & FOUNDER OF SOFT GAME STUDIO.
                  </p>
                  <p className="text-white leading-relaxed">
                    I am a BCA student with expertise in Python, HTML, CSS,
                    JavaScript, React JS, Data Structures & Algorithms (DSA),
                    SQL, Firebase, Unity, and Unreal Engine. I am passionate
                    about exploring new technologies and building innovative
                    projects.
                  </p>

                  <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                  <h2 className="   text-red-400 font-medium title-font tracking-wider text-xl uppercase">
                    LIVESH KUMAR GARG
                  </h2>
                </div>
              </div>

              <div className="lg:w-1/3 lg:mb-0 p-4">
                <div className="h-full text-center">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2FSnapchat-471840155.jpg?alt=media&token=af7951a2-e956-4531-804f-ec448f914083"
                  />
                  <p className=" leading-relaxed text-cyan-400">
                    JUNIOR DEVELOPER OF SOFT GAME STUDIO.
                  </p>
                  <p className="leading-relaxed">
                    I am a B Tech CSBS (Computer Science) student with
                    proficiency in C, C++, Data Structures & Algorithms (DSA),
                    HTML, CSS, JavaScript, and Python. I am eager to expand my
                    knowledge and apply my skills to real-world projects.
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                  <h2 className="   text-red-400 font-medium title-font tracking-wider text-xl uppercase">
                    JATIN DUA
                  </h2>
                </div>
              </div>

              <div className="lg:w-1/3 lg:mb-0 p-4">
                <div className="h-full text-center">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                    src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/DEVLOPERS%2F467048382_429449520023246_5293710440583554823_n.jpeg?alt=media&token=c4cacfe1-bea3-43a6-848e-8b5e852e41a1"
                  />
                  <p className=" leading-relaxed text-cyan-400">
                    JUNIOR DEVELOPER OF SOFT GAME STUDIO.
                  </p>
                  <p className="  leading-relaxed">
                    I am a B Tech CSE student with expertise in C, HTML, CSS,
                    JavaScript, and Firebase database. I am focused on enhancing
                    my skills and working on practical projects to further my
                    knowledge in computer science.
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                  <h2 className="   text-red-400 font-medium title-font tracking-wider text-xl uppercase">
                    SHARIK HASAN
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HeroSection;
