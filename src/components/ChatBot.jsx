import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const ChatBot = ({ isVisible, onClose, language = 'zh' }) => {
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = {
    teacher: [
      '您想教授哪些科目？',
      '您有多少年教学经验？',
      '您期望的课时费是多少？',
      '请留下您的联系方式（邮箱或电话），我们会尽快与您联系。'
    ],
    student: [
      '您需要哪些科目的辅导？',
      '您目前是什么年级？',
      '您期望的上课时间是？',
      '请留下您的联系方式（邮箱或电话），我们会尽快与您联系。'
    ]
  };

  useEffect(() => {
    if (isVisible && messages.length === 0) {
      setMessages([{
        type: 'bot',
        content: '欢迎！请问您是老师还是学生？',
        buttons: [
          { text: '老师', value: 'teacher' },
          { text: '学生', value: 'student' }
        ]
      }]);
    }
  }, [isVisible, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    const userMessage = { type: 'user', content: type === 'teacher' ? '我是老师' : '我是学生' };
    const botMessage = { type: 'bot', content: questions[type][0] };
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputMessage };
    
    // Get current question index
    const currentQuestionIndex = messages.filter(m => m.type === 'bot').length - 1;
    
    // Add bot response
    let nextMessage = '';
    if (currentQuestionIndex < questions[userType].length - 1) {
      nextMessage = questions[userType][currentQuestionIndex + 1];
    } else {
      nextMessage = '感谢您的信息！我们会尽快与您联系。';
    }

    setMessages(prev => [...prev, userMessage, { type: 'bot', content: nextMessage }]);
    setInputMessage('');
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className={`chat-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header" onClick={() => isMinimized && setIsMinimized(false)}>
        <span>在线咨询</span>
        <div className="chat-controls">
          <button className="chat-control-button" onClick={(e) => {
            e.stopPropagation();
            handleMinimize();
          }}>
            {isMinimized ? '□' : '—'}
          </button>
          <button className="chat-control-button" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>×</button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-content">
              {message.content}
              {message.buttons && (
                <div className="button-group">
                  {message.buttons.map((button, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserTypeSelect(button.value)}
                      className="option-button"
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={language === 'en' ? 'Type your message...' : '输入您的消息...'}
        />
        <button onClick={handleSendMessage}>
          {language === 'en' ? 'Send' : '发送'}
        </button>
      </div>
    </div>
  );
};

export default ChatBot; 