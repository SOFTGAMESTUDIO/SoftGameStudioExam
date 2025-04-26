import React from 'react';
import { Link } from "react-router-dom";

const Membe = () => {
    return (
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
    );
}

export default Membe;
