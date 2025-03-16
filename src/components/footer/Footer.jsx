import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { Link } from "react-router-dom";

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <div>
      <footer className="text-white body-font bg-gray-700">
        <div class="container px-5 py-24 mx-auto flex   flex-wrap flex-col">
          <div class="w-full flex-shrink-0  mx-auto text-center ">
            <a class="flex title-font font-medium items-center  justify-center text-white">
              <img
                className="w-16 rounded-full border-2 border-white"
                src="https://firebasestorage.googleapis.com/v0/b/webjl26.appspot.com/o/Designer.png?alt=media&token=3e6ee22e-f7f7-4d73-8ce7-0b1441ed3050"
                alt=""
              />
              <span class="ml-3 text-xl">SOFT GAME STUDIO EXAM</span>
            </a>
            <p class="mt-2 text-sm text-gray-200">
              📚 Programming Made Easy! 📝 Notes | 💻 Source Codes | 🔥 Projects
              🎥 Video Lectures & Practical Examples 🎯 Empowering Students &
              Developers 🌐 Learn. Code. Create. 👇 Join Our Coding Journey!
            </p>
          </div>
         
        </div>

        <div className="bg-gray-900 ">
          <div className="md:flex md:justify-evenly justify-center md:flex-wrap text-center items-center m-4">
            <p className="text-sm    text-white md:w-1/2 hover:text-cyan-400">
              <span className="   text-white ml-1  = pl-2 py-1 ">
                Copyright © 2025
              </span>
              <a
                href="/CopyrightPage"
                rel="noopener noreferrer"
                className="   text-white ml-1   pr-2 py-1 "
                target="_blank"
              >
                SOFT GAME STUDIO
              </a>
            </p>
            <span className=" px-2 py-1 md:w-1/2">
              <div className="flex justify-center items-center ">
                <a
                  href="https://www.facebook.com/profile.php?id=61570435445258"
                  className="m-2 text-2xl"
                >
                  <i class="fa-brands fa-facebook"></i>
                </a>{" "}
                <a
                  href="https://www.instagram.com/softgamestudioofficial/"
                  className="m-2 text-2xl"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/@SoftGameStudioOfficial"
                  className="m-2 text-2xl"
                >
                  <i class="fa-brands fa-youtube"></i>
                </a>{" "}
                <a
                  href="https://whatsapp.com/channel/0029VasdRGzDJ6H5adAsIa0N"
                  className="m-2 text-2xl"
                >
                  <i class="fa-brands fa-whatsapp"></i>
                </a>{" "}
                <a href="https://t.me/softgamestudio" className="m-2 text-2xl">
                  <i class="fa-brands fa-telegram"></i>
                </a>{" "}
                <a
                  href="https://github.com/SOFTGAMESTUDIO"
                  className="m-2 text-2xl"
                >
                  <i class="fa-brands fa-github"></i>
                </a>{" "}
                <a
                  href="https://discord.com/invite/p5mzsy6r"
                  className="m-2 text-2xl"
                >
                  <i class="fa-brands fa-discord"></i>
                </a>
              </div>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
