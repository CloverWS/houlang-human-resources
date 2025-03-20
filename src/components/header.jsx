import React from "react";

export const Header = ({ data, language }) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {data ? data.title[language] : "Loading"}
                  <span></span>
                </h1>
                <p>{data ? data.paragraph[language] : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  {language === 'zh' ? '了解更多' : 'Learn More'}
                </a>{" "}
                <a
                  href="https://mediafiles.botpress.cloud/c514e207-0e70-4bd3-afd3-44404d89c055/webchat/bot.html"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  {language === 'zh' ? 'WhatsApp咨询' : 'WhatsApp Consultation'}
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
