import React from "react";

export const Header = ({ data, language, onChatClick }) => {
  const getButtonText = (key) => {
    const texts = {
      learnMore: {
        'zh-CN': '了解更多',
        'zh-TW': '瞭解更多',
        'en': 'Learn More'
      },
      whatsapp: {
        'zh-CN': 'WhatsApp咨询',
        'zh-TW': 'WhatsApp諮詢',
        'en': 'WhatsApp Consultation'
      }
    };
    return texts[key][language];
  };

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
                <a
                  href="#about"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  {getButtonText('learnMore')}
                </a>{" "}
                <button
                  onClick={onChatClick}
                  className="btn btn-custom btn-lg"
                >
                  {getButtonText('whatsapp')}
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
