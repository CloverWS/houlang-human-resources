import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
// import { Features } from "./components/features";
import { About } from "./components/about";
// import { Services } from "./components/services";
// import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
// import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import ChatBot from './components/ChatBot';
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const WhatsAppIcon = () => (
  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.8 13.2C31.9333 10.3333 28.1333 8.8 24.1333 8.8C15.8667 8.8 9.2 15.4667 9.2 23.7333C9.2 26.4 9.93333 29.0667 11.3333 31.3333L9.06667 39.2L17.2 37C19.3333 38.2667 21.7333 38.9333 24.1333 38.9333C32.4 38.9333 39.0667 32.2667 39.0667 24C39.0667 20 37.6667 16.0667 34.8 13.2ZM24.1333 36.4C21.9333 36.4 19.7333 35.7333 17.8667 34.5333L17.3333 34.2667L12.5333 35.4667L13.7333 30.8L13.4667 30.2667C12.1333 28.2667 11.4667 26 11.4667 23.7333C11.4667 16.8 17.2 11.0667 24.1333 11.0667C27.4667 11.0667 30.6667 12.3333 33 14.6667C35.3333 17 36.6 20.2 36.6 23.7333C36.8 30.6667 31.0667 36.4 24.1333 36.4ZM30.6667 26.9333C30.1333 26.6667 28.1333 25.6667 27.7333 25.5333C27.2 25.4 26.9333 25.2667 26.6667 25.8C26.4 26.3333 25.6 27.2 25.3333 27.4667C25.0667 27.7333 24.8 27.7333 24.2667 27.4667C22.0667 26.3333 20.6667 25.4 19.2667 22.9333C18.8667 22.2667 19.5333 22.2667 20.1333 21.0667C20.2667 20.8 20.1333 20.5333 20 20.2667C19.8667 20 19.2 18 18.8 16.9333C18.4 15.8667 18 16 17.7333 16C17.4667 16 17.2 16 16.9333 16C16.6667 16 16.1333 16.1333 15.7333 16.6667C15.2 17.2 14.1333 18.2 14.1333 20.2667C14.1333 22.3333 15.6 24.2667 15.8667 24.5333C16.1333 24.8 19.2 29.4667 23.7333 31.3333C27.0667 32.6667 28.1333 32.6667 29.4667 32.4C30.2667 32.2667 31.8667 31.3333 32.2667 30.1333C32.6667 28.9333 32.6667 27.8667 32.5333 27.7333C32.4 27.4667 32.1333 27.3333 31.6 27.0667C31.2 27.0667 30.6667 26.9333 30.6667 26.9333Z" fill="white"/>
  </svg>
);

const HomePage = ({ landingPageData, language, onLanguageChange, onChatClick }) => {
  return (
    <>
      <Navigation language={language} onLanguageChange={onLanguageChange} />
      <Header data={landingPageData.Header} language={language} onChatClick={onChatClick} />
      {/* <Features data={landingPageData.Features} /> */}
      <About data={landingPageData.About} language={language} />
      {/* <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} /> */}
      <Contact data={landingPageData.Contact} language={language} />
    </>
  );
};

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [language, setLanguage] = useState('zh-CN'); // 默认简体中文
  const [isChatVisible, setIsChatVisible] = useState(false);

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <Router>
      <Switch>
        <Route 
          exact
          path="/" 
          render={(props) => (
            <HomePage 
              {...props}
              landingPageData={landingPageData} 
              language={language}
              onLanguageChange={handleLanguageChange}
              onChatClick={toggleChat}
            />
          )}
        />
        <Route 
          path="/chat" 
          render={(props) => (
            <ChatBot {...props} language={language} />
          )}
        />
      </Switch>
      
      {/* Chat Icon Button */}
      {!isChatVisible && (
        <div className="chat-icon-button" onClick={toggleChat}>
          <WhatsAppIcon />
        </div>
      )}

      {/* Chat Window */}
      <ChatBot 
        language={language}
        isVisible={isChatVisible}
        onClose={() => setIsChatVisible(false)}
      />
    </Router>
  );
};

export default App;
