import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Device } from '@capacitor/device';
import logo from "../../Assictes/23.png";
import QR from "../../Assictes/SOFT-GAME-STUDIO-04-21-2025_11_08_AM.png";
import JD from "../../Assictes/JD.png";
import LG from "../../Assictes/LG.png";
import SK from "../../Assictes/SK.png";

const Certificate = ({
  name = "Livesh Garg ",
  rollNumber = "250001 ",
  examName = "JavaScript Basics",
  date = "01-01-2025",
  language = "English",
  score = "100",
  Que = "0",
}) => {
  const printRef = useRef();
  

  // Check if running in Capacitor mobile environment
  const isCapacitorMobile = async () => {
    const info = await Device.getInfo();
    return info.platform === 'ios' || info.platform === 'android';
  };

  // ⬇️ Download PDF Certificate (A4 Landscape)
  const handleDownload = async () => {
    const element = printRef.current;

    if (!element) {
      console.error("Certificate element not found");
      return;
    }

    try {
      // Clone the element to apply mobile or desktop styles for PDF capture
      const clone = element.cloneNode(true);

      // Create a container div to hold the clone offscreen
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      // Fix container size to 1123x794 for PDF generation (desktop size)
      container.style.width = "1123px";
      container.style.height = "794px";
    //   if (isMobile) {
    //     container.style.width = "375px"; // typical mobile width
    //     container.style.height = "auto";
    //   } else {
    //     container.style.width = "1123px"; // A4 landscape width in px approx
    //     container.style.height = "794px"; // A4 landscape height in px approx
    //   }
      container.style.backgroundColor = "#0f172a"; // match background
      container.style.overflow = "hidden";

      // Apply mobile or desktop styles conditionally
      // Fix clone size to 1123x794 for PDF generation (desktop size)
      clone.style.width = "1123px";
      clone.style.height = "794px";
    //   if (isMobile) {
    //     // Apply mobile styles: scale down width and height to fit mobile view
    //     clone.style.width = "375px"; // typical mobile width
    //     clone.style.height = "auto";
    //     clone.style.transform = "scale(1)";
    //     clone.style.transformOrigin = "top left";
    //   } else {
    //     // Desktop styles: fixed size
    //     clone.style.width = "1123px";
    //     clone.style.height = "794px";
    //   }

      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait for images to load in the clone
      const images = clone.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.src.includes("firebasestorage")) {
            img.crossOrigin = "anonymous";
          }
          return new Promise((resolve) => {
            if (img.complete && img.naturalHeight !== 0) return resolve();
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      console.log("Starting html2canvas capture");
      // Remove scale transform for PDF generation to keep layout consistent
      clone.style.transform = "none";
      clone.style.transformOrigin = "top left";

      // Use html2canvas to capture the clone with scale 2 for good resolution
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
        width: clone.offsetWidth,
        height: clone.offsetHeight,
      });
      console.log("html2canvas capture completed");

      const imgData = canvas.toDataURL("image/png");
      // Set PDF size to 1123x794 pixels for fixed desktop size
      const pdfWidthPx = 1123;
      const pdfHeightPx = 794;
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [pdfWidthPx, pdfHeightPx],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      console.log("PDF image added");

      // Check if running on Capacitor mobile platform
      if (await isCapacitorMobile()) {
        // Generate PDF blob
        const pdfBlob = pdf.output("blob");
        console.log("PDF blob generated");

        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = async () => {
          const base64data = reader.result.split(",")[1];
          console.log("PDF base64 conversion done");

          try {
            // Save file to device storage
            const result = await Filesystem.writeFile({
              path: `certificate_${name.replace(/\s+/g, "_")}.pdf`,
              data: base64data,
              directory: Directory.Documents,
              recursive: true,
            });
            alert("Certificate saved to device storage.");
          } catch (e) {
            console.error("Error saving file", e);
            alert("Failed to save certificate on device.");
          }
        };
      } else {
        // Web fallback: trigger download
        pdf.save("certificate.pdf");
        console.log("PDF saved via web fallback");
      }

      // Clean up the container
      document.body.removeChild(container);
    } catch (error) {
      console.error("Download failed:", error);
      alert(`Download failed. Please try again. Error: ${error.message || error}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 sm:p-10">
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleDownload}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-3 rounded-lg transition"
        >
          Download Certificate
        </button>
      </div>

      {/* Certificate Preview Area */}
      <div className="m-4 overflow-scroll">
        <div
          ref={printRef}
        >
          <div className="certificate relative w-full h-full bg-slate-900 text-white border-[12px] border-yellow-500 p-6 sm:p-12 rounded-lg shadow-xl">
            {/* Header */}
            <div className="flex justify-center items-center text-center mb-4 mt-4">
              <img
                src={logo}
                alt="Soft Game Studio"
                className="h-12 rounded-full mr-3"
              />
              <div>
                <p className="text-yellow-400 text-lg font-bold">
                  Soft Game Studio
                </p>
                <p className="text-xs text-gray-400">UDYAM-PB-06-0032977</p>
              </div>
            </div>

            {/* QR */}
            <div className="absolute  top-10 left-10  ">
              <img className="h-20 w-20" src={QR} alt="SGS QR" />
            </div>

            {/* Certificate Text */}
            <div className="text-center px-4 sm:px-20">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-2">
                CERTIFICATE
              </h1>
              <h2 className="text-xl sm:text-2xl text-gray-300 tracking-widest mb-4">
                OF APPRECIATION
              </h2>
              <p className="text-base sm:text-lg text-gray-100 mb-2">
                Successfully Completed{" "}
                <span className="text-yellow-400 font-semibold">{examName}</span>{" "}
                IN{" "}
                <span className="text-yellow-400 font-semibold">{language}</span>
              </p>
              <p className="uppercase tracking-wider text-sm text-gray-400 mt-4">
                Presented To
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold border-b-2 border-yellow-500 inline-block px-6 py-4 mt-2">
                {name}
              </h3>
              <p className="text-sm text-gray-400 mt-2">Roll No: {rollNumber}</p>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl mt-8 max-w-4xl mx-auto leading-relaxed text-center px-4">
  This certificate is proudly presented to recognize your outstanding achievement in the 
  <span className="text-blue-400 font-semibold"> Quiz Competition</span>. 
  
  By securing your score of  <span className="text-green-400 font-bold">{score}</span> out of <span className="text-green-400 font-bold"> {Que}</span>, 
  you have demonstrated not only a deep understanding of the subject matter but also exceptional dedication, focus, and perseverance. 
  
  Your performance reflects your knowledge as well as your unwavering determination and passion for learning. 
 
  We commend your efforts and celebrate this accomplishment as a testament to your hard work, resilience, and commitment to excellence.
</p>




            </div>

            {/* Signatures */}
            <div className="flex justify-evenly mt-8 text-center items-end flex-wrap mb-8 ">
              <div>
                <img src={LG} alt={LG} className="h-12 mx-auto m-2" />
                <p className="font-medium">Livesh Garg</p>
                <p className="text-sm text-gray-400">Director of Education</p>
              </div>
              <div>
                <img src={JD} alt={JD} className="h-12 mx-auto m-2 " />
                <p className="font-medium">Jatin Dua</p>
                <p className="text-sm text-gray-400">Exam Conductor</p>
              </div>
              <div>
                <img src={SK} alt={SK} className="h-12 mx-auto m-2 " />
                <p className="font-medium">Sharik Hasan</p>
                <p className="text-sm text-gray-400">Exam Head</p>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
              Date of Completion: {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
