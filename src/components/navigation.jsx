import React from "react";

export const Navigation = ({ language, onLanguageChange }) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Smart Teacher Platform
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {/* <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li> */}
            <li>
              <a 
                href="#"
                className="page-scroll"
                onClick={(e) => {
                  e.preventDefault();
                  onLanguageChange();
                }}
              >
                {language === 'zh' ? 'English' : '中文'}
              </a>
            </li>
            {/* <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
              <a href="#about" className="page-scroll">
                {language === 'zh' ? '关于我们' : 'About'}
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                {language === 'zh' ? '联系我们' : 'Contact'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
