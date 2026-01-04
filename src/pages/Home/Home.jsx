import React from "react";
import Latest from "../../components/Home/Latest/Latest";
import HeroSection from "../../components/Home/HeroSection/HeroSection";
import WhyChooseBookCourier from "../../components/Home/WhyChooseBookCourier/WhyChooseBookCourier";
import Coverage from "../../components/Home/Coverage/Coverage";
import ServicesSection from "../../components/Home/Services/Services";
import Reviews from "../../components/Home/Reviews/Reviews";
const reviewsPromise = fetch("/data/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <HeroSection />
      <Latest />
      <WhyChooseBookCourier />
      <ServicesSection />
      <Reviews reviewsPromise={reviewsPromise} />
      <Coverage />
    </div>
  );
};

export default Home;
