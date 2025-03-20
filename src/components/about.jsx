import React from "react";

export const About = ({ data, language }) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{language === 'zh' ? '关于我们' : 'About Us'}</h2>
              <p>{data ? data.paragraph[language] : "loading..."}</p>
              <h3>{language === 'zh' ? '为什么选择我们？' : 'Why Choose Us?'}</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data
                      ? data.Why.map((d, i) => (
                          <li key={`${d.en}-${i}`}>{d[language]}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {data
                      ? data.Why2.map((d, i) => (
                          <li key={`${d.en}-${i}`}>{d[language]}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
