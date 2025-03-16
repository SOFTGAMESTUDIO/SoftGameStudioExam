import React, { } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";

function Home() {
  return (
    <Layout>
      <div className="w-full h-full bg-center bg-fixed bg-no-repeat bg-cover ">
        <div className=" h-full w-full bg-center">
          <HeroSection />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
