import React from "react";

export const Navigation = ({ language, onLanguageChange }) => {
  // 获取导航文本
  const getNavText = (key) => {
    const texts = {
      about: {
        'zh-CN': '关于我们',
        'zh-TW': '關於我們',
        'en': 'About'
      },
      contact: {
        'zh-CN': '联系我们',
        'zh-TW': '聯繫我們',
        'en': 'Contact'
      }
    };
    return texts[key][language];
  };

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
            <li className="dropdown">
              <a 
                href="#"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-globe"></i> {language} <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onLanguageChange('zh-CN');
                    }}
                  >
                    简体中文
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onLanguageChange('zh-TW');
                    }}
                  >
                    繁體中文
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onLanguageChange('en');
                    }}
                  >
                    English
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                {getNavText('about')}
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                {getNavText('contact')}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
