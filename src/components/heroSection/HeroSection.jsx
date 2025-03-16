import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className=" slide-container ">
      <div className=" items-center h-full text-gray-100">
        <div className="w-full bg-no-repeat bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Hero%20Section%2Fpexels-luis-gomes-166706-546819.jpg?alt=media&token=e32fce6c-8ef8-4a23-8b15-cccd4a3ce02b')]">
          <div className="bg-black/80 text-gray-100 min-h-screen flex items-center justify-center p-6">
            <div className="max-w-3xl space-y-6 ">
              <h1 className="text-4xl font-bold text-center text-teal-400 animate-bounce-in">
                WELCOME TO SOFT GAME STUDIO
              </h1>
              <p className="text-lg leading-7 animate-slide-in-left">
                SOFT GAME STUDIO is your hub for programming education, offering
                clear notes, source code, projects, and video tutorials to help
                students and developers learn and grow.
              </p>
              <h2 className="text-2xl font-semibold text-teal-300 animate-slide-in-left">
                What We Provide
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li className="animate-fade-in">
                  <span className="font-bold text-teal-200">
                    Programming Notes:
                  </span>{" "}
                  Easy-to-follow guides on various programming languages.
                </li>
                <li className="animate-fade-in">
                  <span className="font-bold text-teal-200">Source Code:</span>{" "}
                  Ready-made programs to enhance coding skills.
                </li>
                <li className="animate-fade-in">
                  <span className="font-bold text-teal-200">Projects:</span>{" "}
                  Ideal for college assignments and personal development.
                </li>
                <li className="animate-fade-in">
                  <span className="font-bold text-teal-200">
                    Video Tutorials:
                  </span>{" "}
                  Hands-on coding lessons to simplify complex topics.
                </li>
                <li className="animate-fade-in">
                  <span className="font-bold text-teal-200">
                    Practical Resources:
                  </span>{" "}
                  Examples and links to deepen your knowledge.
                </li>
              </ul>
              <p className="mt-6 text-lg leading-7 animate-slide-in-bottom">
                Our mission is to make programming simple and accessible,
                empowering learners to create and innovate with confidence.{" "}
                <span className="font-bold text-teal-400">Join us today!</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <section class="text-gray-400 bg-gray-900 body-font">
            <div class="container px-5 py-24 mx-auto">
              <div class="flex flex-wrap -m-4">
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/WEBJLEXAM"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Online Exam & Seminars
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        WEB JL EXAM
                      </h1>
                      <p class="leading-relaxed mb-3">
                        🎮, we specialize in online exams 🖥️ and free seminars
                        🎓 to help students build skills 🛠️ and improve their
                        practice 🧑‍💻.
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/Game_Code"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Games
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Game Code
                      </h1>
                      <p class="leading-relaxed mb-3">
                        Game Code: Full Source Code for Web and App Games
                        🎮💻📱" provides complete game source codes for easy
                        customization, allowing you to enjoy creating and
                        developing web and mobile games 🎉✨.
                      </p>
                      <span className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/Projects_Code"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Projetcs
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Projetct code
                      </h1>
                      <p class="leading-relaxed mb-3">
                        Project Code in Web" refers to the complete source code
                        used for creating and developing web-based applications
                        and games. It includes all the necessary files, such as
                        HTML, CSS, JavaScript, and possibly back-end code,
                        enabling developers to build and customize their web
                        projects efficiently.
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/Our_Courses"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Free & Priced Resources
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Our Courses
                      </h1>
                      <p class="leading-relaxed mb-3">
                        Free & Affordable Priced Courses with Source Code,
                        Notes, and Video Tutorials" offer direct access to
                        valuable coding resources at a budget-friendly price,
                        helping you learn programming efficiently. 💻📚🎓
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/Notes"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        All Subjects Notes
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Subjects Notes
                      </h1>
                      <p class="leading-relaxed mb-3">
                        "Free All Subjects Notes to Study 📚✍️🎓 – Access
                        high-quality study notes for every subject at no cost!
                        Simplify your learning and boost your knowledge with
                        well-organized resources. 🚀📖"
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/soft_game_studio_gift"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Gift & Games
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Soft Game Studio Gift
                      </h1>
                      <p class="leading-relaxed mb-3">
                        "Soft Game Studio Gift 🎁" offers exciting prizes to
                        winning students, including opportunities to play our
                        games and regular access to join our Soft Game Studio.
                        It’s a great way to engage with our community, develop
                        your skills, and enjoy exclusive rewards! 🎮🏆
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/Links"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Projects Links For Developers
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Projects Links
                      </h1>
                      <p class="leading-relaxed mb-3">
                        "Open Source Project Links – Free 🛠️💻🚀 | Explore a
                        collection of open-source projects to enhance your
                        skills, practice real-world coding, and accelerate your
                        learning journey. Perfect for developers at any level!
                        🔗📚"
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/OnlineGame"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Online Games
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Online Games
                      </h1>
                      <p class="leading-relaxed mb-3">
                        "Online Games to Play Free 🎮🕹️🚀 | Enjoy a variety of
                        fun and exciting online games at no cost! Play anytime,
                        challenge yourself, and have endless entertainment.
                        🏆🔥"
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
                <div class="p-4 lg:w-1/3 hover:scale-105 transition-all duration-500">
                  <Link to={"/Compiler"}>
                    <div class="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        Onlien Compilers
                      </h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                        Coding Compilers
                      </h1>
                      <p class="leading-relaxed mb-3">
                        "Online Coding Compilers 💻🚀⚡ | Write, run, and test
                        your code instantly with free online compilers. Support
                        for multiple programming languages to boost your coding
                        efficiency! 🖥️📜"
                      </p>
                      <snap className="text-indigo-400 inline-flex items-center">
                        Learn More
                        <svg
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </snap>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
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
