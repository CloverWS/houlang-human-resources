import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
// import { Features } from "./components/features";
import { About } from "./components/about";
// import { Services } from "./components/services";
// import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
// import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [language, setLanguage] = useState('zh');

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div>
      <Navigation language={language} onLanguageChange={toggleLanguage} />
      <Header data={landingPageData.Header} language={language} />
      {/* <Features data={landingPageData.Features} /> */}
      <About data={landingPageData.About} language={language} />
      {/* <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} /> */}
      <Contact data={landingPageData.Contact} language={language} />
    </div>
  );
};

export default App;
