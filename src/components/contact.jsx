import { useState } from "react";
import React from "react";
import Popup from "./Popup";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = ({ data, language }) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const clearState = () => {
    setState({ ...initialState });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = {
        'zh-CN': '请输入姓名',
        'zh-TW': '請輸入姓名',
        'en': 'Please enter your name'
      }[language];
    }
    if (!email.trim()) {
      newErrors.email = {
        'zh-CN': '请输入电子邮箱',
        'zh-TW': '請輸入電子郵箱',
        'en': 'Please enter your email'
      }[language];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = {
        'zh-CN': '请输入有效的电子邮箱',
        'zh-TW': '請輸入有效的電子郵箱',
        'en': 'Please enter a valid email'
      }[language];
    }
    if (!message.trim()) {
      newErrors.message = {
        'zh-CN': '请输入消息内容',
        'zh-TW': '請輸入訊息內容',
        'en': 'Please enter your message'
      }[language];
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Simply show success popup and clear form
    clearState();
    setShowPopup(true);
  };

  const successMessage = {
    'zh-CN': '消息发送成功！我们会尽快回复您。',
    'zh-TW': '訊息發送成功！我們會盡快回覆您。',
    'en': 'Message sent successfully! We will get back to you soon.'
  }[language];

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>{data ? data.title[language] : "loading"}</h2>
                <p>{data ? data.subtitle[language] : "loading"}</p>
              </div>
              <form name="sentMessage" noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder={data ? data.form.name[language] : "Name"}
                        value={name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="help-block text-danger">{errors.name}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder={data ? data.form.email[language] : "Email"}
                        value={email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="help-block text-danger">{errors.email}</div>}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    rows="4"
                    placeholder={data ? data.form.message[language] : "Message"}
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <div className="help-block text-danger">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  {data ? data.form.send[language] : "Send Message"}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>{data ? data.info.title[language] : "Contact Info"}</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> {data ? data.info.addressLabel[language] : "Address"}
                </span>
                {data ? data.info.address[language] : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> {data ? data.info.phoneLabel[language] : "Phone"}
                </span>{" "}
                {data ? data.info.phone[language] : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> {data ? data.info.emailLabel[language] : "Email"}
                </span>{" "}
                {data ? data.info.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  {/* 社交媒体图标暂时隐藏，等未来开通社交媒体账号后再显示
                  <li>
                    <a href={data ? data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={data ? data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={data ? data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
          message={successMessage}
          onClose={() => setShowPopup(false)}
          language={language}
        />
      )}
      <div id="footer">
        <div className="container text-center">
          <p>
            © 2025 [Smart Teacher Platform].
          </p>
        </div>
      </div>
    </div>
  );
};
